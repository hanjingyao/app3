package com.jouav.myapp.web.rest;

import com.jouav.myapp.App3App;

import com.jouav.myapp.domain.TestRecord;
import com.jouav.myapp.repository.TestRecordRepository;
import com.jouav.myapp.service.TestRecordService;
import com.jouav.myapp.service.dto.TestRecordDTO;
import com.jouav.myapp.service.mapper.TestRecordMapper;
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
 * Test class for the TestRecordResource REST controller.
 *
 * @see TestRecordResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = App3App.class)
public class TestRecordResourceIntTest {

    private static final String DEFAULT_TEST_RECORD = "AAAAAAAAAA";
    private static final String UPDATED_TEST_RECORD = "BBBBBBBBBB";

    @Autowired
    private TestRecordRepository testRecordRepository;

    @Autowired
    private TestRecordMapper testRecordMapper;

    @Autowired
    private TestRecordService testRecordService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTestRecordMockMvc;

    private TestRecord testRecord;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TestRecordResource testRecordResource = new TestRecordResource(testRecordService);
        this.restTestRecordMockMvc = MockMvcBuilders.standaloneSetup(testRecordResource)
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
    public static TestRecord createEntity(EntityManager em) {
        TestRecord testRecord = new TestRecord()
            .testRecord(DEFAULT_TEST_RECORD);
        return testRecord;
    }

    @Before
    public void initTest() {
        testRecord = createEntity(em);
    }

    @Test
    @Transactional
    public void createTestRecord() throws Exception {
        int databaseSizeBeforeCreate = testRecordRepository.findAll().size();

        // Create the TestRecord
        TestRecordDTO testRecordDTO = testRecordMapper.toDto(testRecord);
        restTestRecordMockMvc.perform(post("/api/test-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testRecordDTO)))
            .andExpect(status().isCreated());

        // Validate the TestRecord in the database
        List<TestRecord> testRecordList = testRecordRepository.findAll();
        assertThat(testRecordList).hasSize(databaseSizeBeforeCreate + 1);
        TestRecord testTestRecord = testRecordList.get(testRecordList.size() - 1);
        assertThat(testTestRecord.getTestRecord()).isEqualTo(DEFAULT_TEST_RECORD);
    }

    @Test
    @Transactional
    public void createTestRecordWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = testRecordRepository.findAll().size();

        // Create the TestRecord with an existing ID
        testRecord.setId(1L);
        TestRecordDTO testRecordDTO = testRecordMapper.toDto(testRecord);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTestRecordMockMvc.perform(post("/api/test-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testRecordDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TestRecord in the database
        List<TestRecord> testRecordList = testRecordRepository.findAll();
        assertThat(testRecordList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTestRecords() throws Exception {
        // Initialize the database
        testRecordRepository.saveAndFlush(testRecord);

        // Get all the testRecordList
        restTestRecordMockMvc.perform(get("/api/test-records?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testRecord.getId().intValue())))
            .andExpect(jsonPath("$.[*].testRecord").value(hasItem(DEFAULT_TEST_RECORD.toString())));
    }

    @Test
    @Transactional
    public void getTestRecord() throws Exception {
        // Initialize the database
        testRecordRepository.saveAndFlush(testRecord);

        // Get the testRecord
        restTestRecordMockMvc.perform(get("/api/test-records/{id}", testRecord.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(testRecord.getId().intValue()))
            .andExpect(jsonPath("$.testRecord").value(DEFAULT_TEST_RECORD.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTestRecord() throws Exception {
        // Get the testRecord
        restTestRecordMockMvc.perform(get("/api/test-records/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTestRecord() throws Exception {
        // Initialize the database
        testRecordRepository.saveAndFlush(testRecord);
        int databaseSizeBeforeUpdate = testRecordRepository.findAll().size();

        // Update the testRecord
        TestRecord updatedTestRecord = testRecordRepository.findOne(testRecord.getId());
        // Disconnect from session so that the updates on updatedTestRecord are not directly saved in db
        em.detach(updatedTestRecord);
        updatedTestRecord
            .testRecord(UPDATED_TEST_RECORD);
        TestRecordDTO testRecordDTO = testRecordMapper.toDto(updatedTestRecord);

        restTestRecordMockMvc.perform(put("/api/test-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testRecordDTO)))
            .andExpect(status().isOk());

        // Validate the TestRecord in the database
        List<TestRecord> testRecordList = testRecordRepository.findAll();
        assertThat(testRecordList).hasSize(databaseSizeBeforeUpdate);
        TestRecord testTestRecord = testRecordList.get(testRecordList.size() - 1);
        assertThat(testTestRecord.getTestRecord()).isEqualTo(UPDATED_TEST_RECORD);
    }

    @Test
    @Transactional
    public void updateNonExistingTestRecord() throws Exception {
        int databaseSizeBeforeUpdate = testRecordRepository.findAll().size();

        // Create the TestRecord
        TestRecordDTO testRecordDTO = testRecordMapper.toDto(testRecord);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTestRecordMockMvc.perform(put("/api/test-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testRecordDTO)))
            .andExpect(status().isCreated());

        // Validate the TestRecord in the database
        List<TestRecord> testRecordList = testRecordRepository.findAll();
        assertThat(testRecordList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTestRecord() throws Exception {
        // Initialize the database
        testRecordRepository.saveAndFlush(testRecord);
        int databaseSizeBeforeDelete = testRecordRepository.findAll().size();

        // Get the testRecord
        restTestRecordMockMvc.perform(delete("/api/test-records/{id}", testRecord.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TestRecord> testRecordList = testRecordRepository.findAll();
        assertThat(testRecordList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TestRecord.class);
        TestRecord testRecord1 = new TestRecord();
        testRecord1.setId(1L);
        TestRecord testRecord2 = new TestRecord();
        testRecord2.setId(testRecord1.getId());
        assertThat(testRecord1).isEqualTo(testRecord2);
        testRecord2.setId(2L);
        assertThat(testRecord1).isNotEqualTo(testRecord2);
        testRecord1.setId(null);
        assertThat(testRecord1).isNotEqualTo(testRecord2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TestRecordDTO.class);
        TestRecordDTO testRecordDTO1 = new TestRecordDTO();
        testRecordDTO1.setId(1L);
        TestRecordDTO testRecordDTO2 = new TestRecordDTO();
        assertThat(testRecordDTO1).isNotEqualTo(testRecordDTO2);
        testRecordDTO2.setId(testRecordDTO1.getId());
        assertThat(testRecordDTO1).isEqualTo(testRecordDTO2);
        testRecordDTO2.setId(2L);
        assertThat(testRecordDTO1).isNotEqualTo(testRecordDTO2);
        testRecordDTO1.setId(null);
        assertThat(testRecordDTO1).isNotEqualTo(testRecordDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(testRecordMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(testRecordMapper.fromId(null)).isNull();
    }
}
