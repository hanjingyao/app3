package com.jouav.myapp.web.rest;

import com.jouav.myapp.App3App;

import com.jouav.myapp.domain.ProcedureTable;
import com.jouav.myapp.repository.ProcedureTableRepository;
import com.jouav.myapp.service.ProcedureTableService;
import com.jouav.myapp.service.dto.ProcedureTableDTO;
import com.jouav.myapp.service.mapper.ProcedureTableMapper;
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
 * Test class for the ProcedureTableResource REST controller.
 *
 * @see ProcedureTableResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = App3App.class)
public class ProcedureTableResourceIntTest {

    private static final String DEFAULT_PROCEDURE_TABLE = "AAAAAAAAAA";
    private static final String UPDATED_PROCEDURE_TABLE = "BBBBBBBBBB";

    @Autowired
    private ProcedureTableRepository procedureTableRepository;

    @Autowired
    private ProcedureTableMapper procedureTableMapper;

    @Autowired
    private ProcedureTableService procedureTableService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restProcedureTableMockMvc;

    private ProcedureTable procedureTable;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProcedureTableResource procedureTableResource = new ProcedureTableResource(procedureTableService);
        this.restProcedureTableMockMvc = MockMvcBuilders.standaloneSetup(procedureTableResource)
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
    public static ProcedureTable createEntity(EntityManager em) {
        ProcedureTable procedureTable = new ProcedureTable()
            .procedureTable(DEFAULT_PROCEDURE_TABLE);
        return procedureTable;
    }

    @Before
    public void initTest() {
        procedureTable = createEntity(em);
    }

    @Test
    @Transactional
    public void createProcedureTable() throws Exception {
        int databaseSizeBeforeCreate = procedureTableRepository.findAll().size();

        // Create the ProcedureTable
        ProcedureTableDTO procedureTableDTO = procedureTableMapper.toDto(procedureTable);
        restProcedureTableMockMvc.perform(post("/api/procedure-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(procedureTableDTO)))
            .andExpect(status().isCreated());

        // Validate the ProcedureTable in the database
        List<ProcedureTable> procedureTableList = procedureTableRepository.findAll();
        assertThat(procedureTableList).hasSize(databaseSizeBeforeCreate + 1);
        ProcedureTable testProcedureTable = procedureTableList.get(procedureTableList.size() - 1);
        assertThat(testProcedureTable.getProcedureTable()).isEqualTo(DEFAULT_PROCEDURE_TABLE);
    }

    @Test
    @Transactional
    public void createProcedureTableWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = procedureTableRepository.findAll().size();

        // Create the ProcedureTable with an existing ID
        procedureTable.setId(1L);
        ProcedureTableDTO procedureTableDTO = procedureTableMapper.toDto(procedureTable);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProcedureTableMockMvc.perform(post("/api/procedure-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(procedureTableDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ProcedureTable in the database
        List<ProcedureTable> procedureTableList = procedureTableRepository.findAll();
        assertThat(procedureTableList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllProcedureTables() throws Exception {
        // Initialize the database
        procedureTableRepository.saveAndFlush(procedureTable);

        // Get all the procedureTableList
        restProcedureTableMockMvc.perform(get("/api/procedure-tables?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(procedureTable.getId().intValue())))
            .andExpect(jsonPath("$.[*].procedureTable").value(hasItem(DEFAULT_PROCEDURE_TABLE.toString())));
    }

    @Test
    @Transactional
    public void getProcedureTable() throws Exception {
        // Initialize the database
        procedureTableRepository.saveAndFlush(procedureTable);

        // Get the procedureTable
        restProcedureTableMockMvc.perform(get("/api/procedure-tables/{id}", procedureTable.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(procedureTable.getId().intValue()))
            .andExpect(jsonPath("$.procedureTable").value(DEFAULT_PROCEDURE_TABLE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingProcedureTable() throws Exception {
        // Get the procedureTable
        restProcedureTableMockMvc.perform(get("/api/procedure-tables/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProcedureTable() throws Exception {
        // Initialize the database
        procedureTableRepository.saveAndFlush(procedureTable);
        int databaseSizeBeforeUpdate = procedureTableRepository.findAll().size();

        // Update the procedureTable
        ProcedureTable updatedProcedureTable = procedureTableRepository.findOne(procedureTable.getId());
        // Disconnect from session so that the updates on updatedProcedureTable are not directly saved in db
        em.detach(updatedProcedureTable);
        updatedProcedureTable
            .procedureTable(UPDATED_PROCEDURE_TABLE);
        ProcedureTableDTO procedureTableDTO = procedureTableMapper.toDto(updatedProcedureTable);

        restProcedureTableMockMvc.perform(put("/api/procedure-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(procedureTableDTO)))
            .andExpect(status().isOk());

        // Validate the ProcedureTable in the database
        List<ProcedureTable> procedureTableList = procedureTableRepository.findAll();
        assertThat(procedureTableList).hasSize(databaseSizeBeforeUpdate);
        ProcedureTable testProcedureTable = procedureTableList.get(procedureTableList.size() - 1);
        assertThat(testProcedureTable.getProcedureTable()).isEqualTo(UPDATED_PROCEDURE_TABLE);
    }

    @Test
    @Transactional
    public void updateNonExistingProcedureTable() throws Exception {
        int databaseSizeBeforeUpdate = procedureTableRepository.findAll().size();

        // Create the ProcedureTable
        ProcedureTableDTO procedureTableDTO = procedureTableMapper.toDto(procedureTable);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restProcedureTableMockMvc.perform(put("/api/procedure-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(procedureTableDTO)))
            .andExpect(status().isCreated());

        // Validate the ProcedureTable in the database
        List<ProcedureTable> procedureTableList = procedureTableRepository.findAll();
        assertThat(procedureTableList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteProcedureTable() throws Exception {
        // Initialize the database
        procedureTableRepository.saveAndFlush(procedureTable);
        int databaseSizeBeforeDelete = procedureTableRepository.findAll().size();

        // Get the procedureTable
        restProcedureTableMockMvc.perform(delete("/api/procedure-tables/{id}", procedureTable.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ProcedureTable> procedureTableList = procedureTableRepository.findAll();
        assertThat(procedureTableList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProcedureTable.class);
        ProcedureTable procedureTable1 = new ProcedureTable();
        procedureTable1.setId(1L);
        ProcedureTable procedureTable2 = new ProcedureTable();
        procedureTable2.setId(procedureTable1.getId());
        assertThat(procedureTable1).isEqualTo(procedureTable2);
        procedureTable2.setId(2L);
        assertThat(procedureTable1).isNotEqualTo(procedureTable2);
        procedureTable1.setId(null);
        assertThat(procedureTable1).isNotEqualTo(procedureTable2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProcedureTableDTO.class);
        ProcedureTableDTO procedureTableDTO1 = new ProcedureTableDTO();
        procedureTableDTO1.setId(1L);
        ProcedureTableDTO procedureTableDTO2 = new ProcedureTableDTO();
        assertThat(procedureTableDTO1).isNotEqualTo(procedureTableDTO2);
        procedureTableDTO2.setId(procedureTableDTO1.getId());
        assertThat(procedureTableDTO1).isEqualTo(procedureTableDTO2);
        procedureTableDTO2.setId(2L);
        assertThat(procedureTableDTO1).isNotEqualTo(procedureTableDTO2);
        procedureTableDTO1.setId(null);
        assertThat(procedureTableDTO1).isNotEqualTo(procedureTableDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(procedureTableMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(procedureTableMapper.fromId(null)).isNull();
    }
}
