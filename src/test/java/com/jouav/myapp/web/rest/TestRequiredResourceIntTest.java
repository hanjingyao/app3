package com.jouav.myapp.web.rest;

import com.jouav.myapp.App3App;

import com.jouav.myapp.domain.TestRequired;
import com.jouav.myapp.repository.TestRequiredRepository;
import com.jouav.myapp.service.TestRequiredService;
import com.jouav.myapp.service.dto.TestRequiredDTO;
import com.jouav.myapp.service.mapper.TestRequiredMapper;
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
 * Test class for the TestRequiredResource REST controller.
 *
 * @see TestRequiredResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = App3App.class)
public class TestRequiredResourceIntTest {

    private static final String DEFAULT_TEST_REQUIRED_OF_ALL = "AAAAAAAAAA";
    private static final String UPDATED_TEST_REQUIRED_OF_ALL = "BBBBBBBBBB";

    @Autowired
    private TestRequiredRepository testRequiredRepository;

    @Autowired
    private TestRequiredMapper testRequiredMapper;

    @Autowired
    private TestRequiredService testRequiredService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTestRequiredMockMvc;

    private TestRequired testRequired;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TestRequiredResource testRequiredResource = new TestRequiredResource(testRequiredService);
        this.restTestRequiredMockMvc = MockMvcBuilders.standaloneSetup(testRequiredResource)
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
    public static TestRequired createEntity(EntityManager em) {
        TestRequired testRequired = new TestRequired()
            .testRequiredOfAll(DEFAULT_TEST_REQUIRED_OF_ALL);
        return testRequired;
    }

    @Before
    public void initTest() {
        testRequired = createEntity(em);
    }

    @Test
    @Transactional
    public void createTestRequired() throws Exception {
        int databaseSizeBeforeCreate = testRequiredRepository.findAll().size();

        // Create the TestRequired
        TestRequiredDTO testRequiredDTO = testRequiredMapper.toDto(testRequired);
        restTestRequiredMockMvc.perform(post("/api/test-requireds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testRequiredDTO)))
            .andExpect(status().isCreated());

        // Validate the TestRequired in the database
        List<TestRequired> testRequiredList = testRequiredRepository.findAll();
        assertThat(testRequiredList).hasSize(databaseSizeBeforeCreate + 1);
        TestRequired testTestRequired = testRequiredList.get(testRequiredList.size() - 1);
        assertThat(testTestRequired.getTestRequiredOfAll()).isEqualTo(DEFAULT_TEST_REQUIRED_OF_ALL);
    }

    @Test
    @Transactional
    public void createTestRequiredWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = testRequiredRepository.findAll().size();

        // Create the TestRequired with an existing ID
        testRequired.setId(1L);
        TestRequiredDTO testRequiredDTO = testRequiredMapper.toDto(testRequired);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTestRequiredMockMvc.perform(post("/api/test-requireds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testRequiredDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TestRequired in the database
        List<TestRequired> testRequiredList = testRequiredRepository.findAll();
        assertThat(testRequiredList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTestRequireds() throws Exception {
        // Initialize the database
        testRequiredRepository.saveAndFlush(testRequired);

        // Get all the testRequiredList
        restTestRequiredMockMvc.perform(get("/api/test-requireds?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testRequired.getId().intValue())))
            .andExpect(jsonPath("$.[*].testRequiredOfAll").value(hasItem(DEFAULT_TEST_REQUIRED_OF_ALL.toString())));
    }

    @Test
    @Transactional
    public void getTestRequired() throws Exception {
        // Initialize the database
        testRequiredRepository.saveAndFlush(testRequired);

        // Get the testRequired
        restTestRequiredMockMvc.perform(get("/api/test-requireds/{id}", testRequired.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(testRequired.getId().intValue()))
            .andExpect(jsonPath("$.testRequiredOfAll").value(DEFAULT_TEST_REQUIRED_OF_ALL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTestRequired() throws Exception {
        // Get the testRequired
        restTestRequiredMockMvc.perform(get("/api/test-requireds/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTestRequired() throws Exception {
        // Initialize the database
        testRequiredRepository.saveAndFlush(testRequired);
        int databaseSizeBeforeUpdate = testRequiredRepository.findAll().size();

        // Update the testRequired
        TestRequired updatedTestRequired = testRequiredRepository.findOne(testRequired.getId());
        // Disconnect from session so that the updates on updatedTestRequired are not directly saved in db
        em.detach(updatedTestRequired);
        updatedTestRequired
            .testRequiredOfAll(UPDATED_TEST_REQUIRED_OF_ALL);
        TestRequiredDTO testRequiredDTO = testRequiredMapper.toDto(updatedTestRequired);

        restTestRequiredMockMvc.perform(put("/api/test-requireds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testRequiredDTO)))
            .andExpect(status().isOk());

        // Validate the TestRequired in the database
        List<TestRequired> testRequiredList = testRequiredRepository.findAll();
        assertThat(testRequiredList).hasSize(databaseSizeBeforeUpdate);
        TestRequired testTestRequired = testRequiredList.get(testRequiredList.size() - 1);
        assertThat(testTestRequired.getTestRequiredOfAll()).isEqualTo(UPDATED_TEST_REQUIRED_OF_ALL);
    }

    @Test
    @Transactional
    public void updateNonExistingTestRequired() throws Exception {
        int databaseSizeBeforeUpdate = testRequiredRepository.findAll().size();

        // Create the TestRequired
        TestRequiredDTO testRequiredDTO = testRequiredMapper.toDto(testRequired);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTestRequiredMockMvc.perform(put("/api/test-requireds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testRequiredDTO)))
            .andExpect(status().isCreated());

        // Validate the TestRequired in the database
        List<TestRequired> testRequiredList = testRequiredRepository.findAll();
        assertThat(testRequiredList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTestRequired() throws Exception {
        // Initialize the database
        testRequiredRepository.saveAndFlush(testRequired);
        int databaseSizeBeforeDelete = testRequiredRepository.findAll().size();

        // Get the testRequired
        restTestRequiredMockMvc.perform(delete("/api/test-requireds/{id}", testRequired.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TestRequired> testRequiredList = testRequiredRepository.findAll();
        assertThat(testRequiredList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TestRequired.class);
        TestRequired testRequired1 = new TestRequired();
        testRequired1.setId(1L);
        TestRequired testRequired2 = new TestRequired();
        testRequired2.setId(testRequired1.getId());
        assertThat(testRequired1).isEqualTo(testRequired2);
        testRequired2.setId(2L);
        assertThat(testRequired1).isNotEqualTo(testRequired2);
        testRequired1.setId(null);
        assertThat(testRequired1).isNotEqualTo(testRequired2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TestRequiredDTO.class);
        TestRequiredDTO testRequiredDTO1 = new TestRequiredDTO();
        testRequiredDTO1.setId(1L);
        TestRequiredDTO testRequiredDTO2 = new TestRequiredDTO();
        assertThat(testRequiredDTO1).isNotEqualTo(testRequiredDTO2);
        testRequiredDTO2.setId(testRequiredDTO1.getId());
        assertThat(testRequiredDTO1).isEqualTo(testRequiredDTO2);
        testRequiredDTO2.setId(2L);
        assertThat(testRequiredDTO1).isNotEqualTo(testRequiredDTO2);
        testRequiredDTO1.setId(null);
        assertThat(testRequiredDTO1).isNotEqualTo(testRequiredDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(testRequiredMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(testRequiredMapper.fromId(null)).isNull();
    }
}
