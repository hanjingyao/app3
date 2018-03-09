package com.jouav.myapp.web.rest;

import com.jouav.myapp.App3App;

import com.jouav.myapp.domain.TestRecording;
import com.jouav.myapp.repository.TestRecordingRepository;
import com.jouav.myapp.service.TestRecordingService;
import com.jouav.myapp.service.dto.TestRecordingDTO;
import com.jouav.myapp.service.mapper.TestRecordingMapper;
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
 * Test class for the TestRecordingResource REST controller.
 *
 * @see TestRecordingResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = App3App.class)
public class TestRecordingResourceIntTest {

    private static final String DEFAULT_TEST_RECORD = "AAAAAAAAAA";
    private static final String UPDATED_TEST_RECORD = "BBBBBBBBBB";

    @Autowired
    private TestRecordingRepository testRecordingRepository;

    @Autowired
    private TestRecordingMapper testRecordingMapper;

    @Autowired
    private TestRecordingService testRecordingService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTestRecordingMockMvc;

    private TestRecording testRecording;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TestRecordingResource testRecordingResource = new TestRecordingResource(testRecordingService);
        this.restTestRecordingMockMvc = MockMvcBuilders.standaloneSetup(testRecordingResource)
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
    public static TestRecording createEntity(EntityManager em) {
        TestRecording testRecording = new TestRecording()
            .testRecord(DEFAULT_TEST_RECORD);
        return testRecording;
    }

    @Before
    public void initTest() {
        testRecording = createEntity(em);
    }

    @Test
    @Transactional
    public void createTestRecording() throws Exception {
        int databaseSizeBeforeCreate = testRecordingRepository.findAll().size();

        // Create the TestRecording
        TestRecordingDTO testRecordingDTO = testRecordingMapper.toDto(testRecording);
        restTestRecordingMockMvc.perform(post("/api/test-recordings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testRecordingDTO)))
            .andExpect(status().isCreated());

        // Validate the TestRecording in the database
        List<TestRecording> testRecordingList = testRecordingRepository.findAll();
        assertThat(testRecordingList).hasSize(databaseSizeBeforeCreate + 1);
        TestRecording testTestRecording = testRecordingList.get(testRecordingList.size() - 1);
        assertThat(testTestRecording.getTestRecord()).isEqualTo(DEFAULT_TEST_RECORD);
    }

    @Test
    @Transactional
    public void createTestRecordingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = testRecordingRepository.findAll().size();

        // Create the TestRecording with an existing ID
        testRecording.setId(1L);
        TestRecordingDTO testRecordingDTO = testRecordingMapper.toDto(testRecording);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTestRecordingMockMvc.perform(post("/api/test-recordings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testRecordingDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TestRecording in the database
        List<TestRecording> testRecordingList = testRecordingRepository.findAll();
        assertThat(testRecordingList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTestRecordings() throws Exception {
        // Initialize the database
        testRecordingRepository.saveAndFlush(testRecording);

        // Get all the testRecordingList
        restTestRecordingMockMvc.perform(get("/api/test-recordings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testRecording.getId().intValue())))
            .andExpect(jsonPath("$.[*].testRecord").value(hasItem(DEFAULT_TEST_RECORD.toString())));
    }

    @Test
    @Transactional
    public void getTestRecording() throws Exception {
        // Initialize the database
        testRecordingRepository.saveAndFlush(testRecording);

        // Get the testRecording
        restTestRecordingMockMvc.perform(get("/api/test-recordings/{id}", testRecording.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(testRecording.getId().intValue()))
            .andExpect(jsonPath("$.testRecord").value(DEFAULT_TEST_RECORD.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTestRecording() throws Exception {
        // Get the testRecording
        restTestRecordingMockMvc.perform(get("/api/test-recordings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTestRecording() throws Exception {
        // Initialize the database
        testRecordingRepository.saveAndFlush(testRecording);
        int databaseSizeBeforeUpdate = testRecordingRepository.findAll().size();

        // Update the testRecording
        TestRecording updatedTestRecording = testRecordingRepository.findOne(testRecording.getId());
        // Disconnect from session so that the updates on updatedTestRecording are not directly saved in db
        em.detach(updatedTestRecording);
        updatedTestRecording
            .testRecord(UPDATED_TEST_RECORD);
        TestRecordingDTO testRecordingDTO = testRecordingMapper.toDto(updatedTestRecording);

        restTestRecordingMockMvc.perform(put("/api/test-recordings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testRecordingDTO)))
            .andExpect(status().isOk());

        // Validate the TestRecording in the database
        List<TestRecording> testRecordingList = testRecordingRepository.findAll();
        assertThat(testRecordingList).hasSize(databaseSizeBeforeUpdate);
        TestRecording testTestRecording = testRecordingList.get(testRecordingList.size() - 1);
        assertThat(testTestRecording.getTestRecord()).isEqualTo(UPDATED_TEST_RECORD);
    }

    @Test
    @Transactional
    public void updateNonExistingTestRecording() throws Exception {
        int databaseSizeBeforeUpdate = testRecordingRepository.findAll().size();

        // Create the TestRecording
        TestRecordingDTO testRecordingDTO = testRecordingMapper.toDto(testRecording);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTestRecordingMockMvc.perform(put("/api/test-recordings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testRecordingDTO)))
            .andExpect(status().isCreated());

        // Validate the TestRecording in the database
        List<TestRecording> testRecordingList = testRecordingRepository.findAll();
        assertThat(testRecordingList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTestRecording() throws Exception {
        // Initialize the database
        testRecordingRepository.saveAndFlush(testRecording);
        int databaseSizeBeforeDelete = testRecordingRepository.findAll().size();

        // Get the testRecording
        restTestRecordingMockMvc.perform(delete("/api/test-recordings/{id}", testRecording.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TestRecording> testRecordingList = testRecordingRepository.findAll();
        assertThat(testRecordingList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TestRecording.class);
        TestRecording testRecording1 = new TestRecording();
        testRecording1.setId(1L);
        TestRecording testRecording2 = new TestRecording();
        testRecording2.setId(testRecording1.getId());
        assertThat(testRecording1).isEqualTo(testRecording2);
        testRecording2.setId(2L);
        assertThat(testRecording1).isNotEqualTo(testRecording2);
        testRecording1.setId(null);
        assertThat(testRecording1).isNotEqualTo(testRecording2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TestRecordingDTO.class);
        TestRecordingDTO testRecordingDTO1 = new TestRecordingDTO();
        testRecordingDTO1.setId(1L);
        TestRecordingDTO testRecordingDTO2 = new TestRecordingDTO();
        assertThat(testRecordingDTO1).isNotEqualTo(testRecordingDTO2);
        testRecordingDTO2.setId(testRecordingDTO1.getId());
        assertThat(testRecordingDTO1).isEqualTo(testRecordingDTO2);
        testRecordingDTO2.setId(2L);
        assertThat(testRecordingDTO1).isNotEqualTo(testRecordingDTO2);
        testRecordingDTO1.setId(null);
        assertThat(testRecordingDTO1).isNotEqualTo(testRecordingDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(testRecordingMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(testRecordingMapper.fromId(null)).isNull();
    }
}
