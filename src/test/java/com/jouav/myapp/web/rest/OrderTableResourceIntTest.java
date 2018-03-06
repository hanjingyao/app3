package com.jouav.myapp.web.rest;

import com.jouav.myapp.App3App;

import com.jouav.myapp.domain.OrderTable;
import com.jouav.myapp.repository.OrderTableRepository;
import com.jouav.myapp.service.OrderTableService;
import com.jouav.myapp.service.dto.OrderTableDTO;
import com.jouav.myapp.service.mapper.OrderTableMapper;
import com.jouav.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.jouav.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the OrderTableResource REST controller.
 *
 * @see OrderTableResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = App3App.class)
public class OrderTableResourceIntTest {

    private static final String DEFAULT_RANK = "AAAAAAAAAA";
    private static final String UPDATED_RANK = "BBBBBBBBBB";

    @Autowired
    private OrderTableRepository orderTableRepository;

    @Autowired
    private OrderTableMapper orderTableMapper;

    @Autowired
    private OrderTableService orderTableService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restOrderTableMockMvc;

    private OrderTable orderTable;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OrderTableResource orderTableResource = new OrderTableResource(orderTableService);
        this.restOrderTableMockMvc = MockMvcBuilders.standaloneSetup(orderTableResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OrderTable createEntity(EntityManager em) {
        OrderTable orderTable = new OrderTable()
            .rank(DEFAULT_RANK);
        return orderTable;
    }

    @Before
    public void initTest() {
        orderTable = createEntity(em);
    }

    @Test
    @Transactional
    public void createOrderTable() throws Exception {
        int databaseSizeBeforeCreate = orderTableRepository.findAll().size();

        // Create the OrderTable
        OrderTableDTO orderTableDTO = orderTableMapper.toDto(orderTable);
        restOrderTableMockMvc.perform(post("/api/order-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderTableDTO)))
            .andExpect(status().isCreated());

        // Validate the OrderTable in the database
        List<OrderTable> orderTableList = orderTableRepository.findAll();
        assertThat(orderTableList).hasSize(databaseSizeBeforeCreate + 1);
        OrderTable testOrderTable = orderTableList.get(orderTableList.size() - 1);
        assertThat(testOrderTable.getRank()).isEqualTo(DEFAULT_RANK);
    }

    @Test
    @Transactional
    public void createOrderTableWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = orderTableRepository.findAll().size();

        // Create the OrderTable with an existing ID
        orderTable.setId(1L);
        OrderTableDTO orderTableDTO = orderTableMapper.toDto(orderTable);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrderTableMockMvc.perform(post("/api/order-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderTableDTO)))
            .andExpect(status().isBadRequest());

        // Validate the OrderTable in the database
        List<OrderTable> orderTableList = orderTableRepository.findAll();
        assertThat(orderTableList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllOrderTables() throws Exception {
        // Initialize the database
        orderTableRepository.saveAndFlush(orderTable);

        // Get all the orderTableList
        restOrderTableMockMvc.perform(get("/api/order-tables?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(orderTable.getId().intValue())))
            .andExpect(jsonPath("$.[*].rank").value(hasItem(DEFAULT_RANK.toString())));
    }

    @Test
    @Transactional
    public void getOrderTable() throws Exception {
        // Initialize the database
        orderTableRepository.saveAndFlush(orderTable);

        // Get the orderTable
        restOrderTableMockMvc.perform(get("/api/order-tables/{id}", orderTable.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(orderTable.getId().intValue()))
            .andExpect(jsonPath("$.rank").value(DEFAULT_RANK.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingOrderTable() throws Exception {
        // Get the orderTable
        restOrderTableMockMvc.perform(get("/api/order-tables/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOrderTable() throws Exception {
        // Initialize the database
        orderTableRepository.saveAndFlush(orderTable);
        int databaseSizeBeforeUpdate = orderTableRepository.findAll().size();

        // Update the orderTable
        OrderTable updatedOrderTable = orderTableRepository.findOne(orderTable.getId());
        // Disconnect from session so that the updates on updatedOrderTable are not directly saved in db
        em.detach(updatedOrderTable);
        updatedOrderTable
            .rank(UPDATED_RANK);
        OrderTableDTO orderTableDTO = orderTableMapper.toDto(updatedOrderTable);

        restOrderTableMockMvc.perform(put("/api/order-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderTableDTO)))
            .andExpect(status().isOk());

        // Validate the OrderTable in the database
        List<OrderTable> orderTableList = orderTableRepository.findAll();
        assertThat(orderTableList).hasSize(databaseSizeBeforeUpdate);
        OrderTable testOrderTable = orderTableList.get(orderTableList.size() - 1);
        assertThat(testOrderTable.getRank()).isEqualTo(UPDATED_RANK);
    }

    @Test
    @Transactional
    public void updateNonExistingOrderTable() throws Exception {
        int databaseSizeBeforeUpdate = orderTableRepository.findAll().size();

        // Create the OrderTable
        OrderTableDTO orderTableDTO = orderTableMapper.toDto(orderTable);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restOrderTableMockMvc.perform(put("/api/order-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderTableDTO)))
            .andExpect(status().isCreated());

        // Validate the OrderTable in the database
        List<OrderTable> orderTableList = orderTableRepository.findAll();
        assertThat(orderTableList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteOrderTable() throws Exception {
        // Initialize the database
        orderTableRepository.saveAndFlush(orderTable);
        int databaseSizeBeforeDelete = orderTableRepository.findAll().size();

        // Get the orderTable
        restOrderTableMockMvc.perform(delete("/api/order-tables/{id}", orderTable.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<OrderTable> orderTableList = orderTableRepository.findAll();
        assertThat(orderTableList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrderTable.class);
        OrderTable orderTable1 = new OrderTable();
        orderTable1.setId(1L);
        OrderTable orderTable2 = new OrderTable();
        orderTable2.setId(orderTable1.getId());
        assertThat(orderTable1).isEqualTo(orderTable2);
        orderTable2.setId(2L);
        assertThat(orderTable1).isNotEqualTo(orderTable2);
        orderTable1.setId(null);
        assertThat(orderTable1).isNotEqualTo(orderTable2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrderTableDTO.class);
        OrderTableDTO orderTableDTO1 = new OrderTableDTO();
        orderTableDTO1.setId(1L);
        OrderTableDTO orderTableDTO2 = new OrderTableDTO();
        assertThat(orderTableDTO1).isNotEqualTo(orderTableDTO2);
        orderTableDTO2.setId(orderTableDTO1.getId());
        assertThat(orderTableDTO1).isEqualTo(orderTableDTO2);
        orderTableDTO2.setId(2L);
        assertThat(orderTableDTO1).isNotEqualTo(orderTableDTO2);
        orderTableDTO1.setId(null);
        assertThat(orderTableDTO1).isNotEqualTo(orderTableDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(orderTableMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(orderTableMapper.fromId(null)).isNull();
    }
}
