import { EducationLevelConfig } from '../types';

export const EDUCATION_LEVELS: EducationLevelConfig[] = [
  // 1. CLASS 10
  {
    id: 'class_10',
    name: 'Class 10 (Secondary School)',
    shortLabel: 'Class 10',
    description: 'Foundation secondary education across CBSE, ICSE, State Boards & International curricula.',
    iconName: 'GraduationCap',
    qualifications: [
      {
        id: 'secondary_cert',
        title: 'Secondary School Certificate (SSC / 10th Standard)',
        courses: [
          {
            id: 'class_10_general',
            title: 'Class 10 Comprehensive Curriculum',
            code: 'STD-10',
            branchesOrGroups: [
              {
                id: 'class_10_academic',
                title: 'General Secondary Stream',
                boardsAllowed: ['Telangana SSC', 'CBSE', 'CISCE / ICSE', 'State Boards', 'IB / Cambridge', 'Other boards'],
                yearsAllowed: ['Current Academic Year', 'Completed Class 10'],
                specializations: [
                  {
                    id: 'std10_science_entrance',
                    title: 'Science Assessment (Physics, Chemistry & Biology)',
                    description: 'Basic everyday science covering plant parts, body organs, energy, forces, and simple chemistry.',
                    careerPaths: ['Engineering', 'Medical Sciences', 'Research', 'Biotechnology'],
                    suggestedAssessments: ['class10_science']
                  },
                  {
                    id: 'std10_math_entrance',
                    title: 'Mathematics Assessment (Arithmetic, Shapes & Algebra)',
                    description: 'Everyday math covering basic addition/multiplication, fractions, perimeter, area, and simple equations.',
                    careerPaths: ['Engineering', 'Commerce', 'Computer Science', 'Finance'],
                    suggestedAssessments: ['class10_math']
                  },
                  {
                    id: 'std10_english_entrance',
                    title: 'English Assessment (Grammar, Vocabulary & Reading)',
                    description: 'Simple English covering plurals, articles, opposites, spelling, and everyday punctuation.',
                    careerPaths: ['Humanities', 'Journalism', 'Law', 'Civil Services', 'Communications'],
                    suggestedAssessments: ['class10_english']
                  },
                  {
                    id: 'std10_gk_entrance',
                    title: 'General Knowledge Assessment (Social Studies & Everyday Facts)',
                    description: 'Everyday facts, world geography, oceans, capitals, national symbols, and history basics.',
                    careerPaths: ['Civil Services', 'Law', 'Public Policy', 'Defense', 'Journalism'],
                    suggestedAssessments: ['class10_gk']
                  },
                  {
                    id: 'std10_aptitude_entrance',
                    title: 'Basic Aptitude Assessment (Patterns, Analogies & Reasoning)',
                    description: 'Friendly puzzle-solving with number sequences, odd-one-out, word analogies, and basic logic.',
                    careerPaths: ['All Streams', 'Aptitude Benchmarks', 'Logical Problem Solving'],
                    suggestedAssessments: ['class10_aptitude']
                  },
                  {
                    id: 'std10_science_math',
                    title: 'Science & Mathematics Focus (Pre-MPC / Pre-BiPC)',
                    description: 'Physics, Chemistry, Biology, Algebra, and Geometry focus.',
                    careerPaths: ['Engineering', 'Medical Sciences', 'Research', 'Biotechnology'],
                    suggestedAssessments: ['class10_science', 'class10_math']
                  },
                  {
                    id: 'std10_commerce_intro',
                    title: 'Mathematics & Social Sciences Focus (Pre-MEC / Pre-CEC)',
                    description: 'Commercial arithmetic, Economics basics, History, and Civics.',
                    careerPaths: ['Commerce', 'Chartered Accountancy', 'Economics', 'Management'],
                    suggestedAssessments: ['class10_math', 'class10_gk']
                  },
                  {
                    id: 'std10_humanities_intro',
                    title: 'Humanities & Language Focus (Pre-HEC / Arts)',
                    description: 'Social Studies, Literature, Environmental Sciences, and Creative Expression.',
                    careerPaths: ['Law', 'Civil Services', 'Journalism', 'Design', 'Psychology'],
                    suggestedAssessments: ['class10_english', 'class10_gk']
                  },
                  {
                    id: 'std10_integrated',
                    title: 'Standard Board Examination (All Subjects)',
                    description: 'Holistic secondary curriculum covering Math, Science, Social, and English.',
                    careerPaths: ['Stream Selection', 'Diploma Entry', 'Intermediate Admission'],
                    suggestedAssessments: ['class10_entrance_all']
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  // 2. INTERMEDIATE — 11th and 12th
  {
    id: 'intermediate',
    name: 'Intermediate (Class 11–12)',
    shortLabel: 'Intermediate (Class 11–12)',
    description: 'Senior secondary education with Science, Commerce, Humanities, and Vocational combinations.',
    iconName: 'BookOpen',
    qualifications: [
      {
        id: 'intermediate_board',
        title: 'Higher Secondary Certificate (+2 / Intermediate)',
        courses: [
          {
            id: 'inter_science',
            title: 'Intermediate Science Stream',
            category: 'Science',
            branchesOrGroups: [
              {
                id: 'mpc',
                title: 'MPC — Mathematics, Physics, Chemistry',
                code: 'MPC',
                category: 'Science',
                boardsAllowed: ['Telangana Intermediate (TSBIE)', 'CBSE', 'CISCE', 'Andhra Pradesh (BIEAP)', 'Other boards'],
                yearsAllowed: ['First Year (11th)', 'Second Year (12th)'],
                specializations: [
                  {
                    id: 'mpc_core',
                    title: 'MPC (Mathematics, Physics, Chemistry) Core',
                    description: 'Classic physical science and advanced mathematics foundation.',
                    careerPaths: ['B.Tech / B.E.', 'B.Sc. Data Science', 'Architecture (B.Arch)', 'Defense (NDA)', 'Aviation']
                  }
                ]
              },
              {
                id: 'bipc',
                title: 'BiPC — Biology, Physics, Chemistry',
                code: 'BiPC',
                category: 'Science',
                boardsAllowed: ['Telangana Intermediate (TSBIE)', 'CBSE', 'CISCE', 'Andhra Pradesh (BIEAP)', 'Other boards'],
                yearsAllowed: ['First Year (11th)', 'Second Year (12th)'],
                specializations: [
                  {
                    id: 'bipc_core',
                    title: 'BiPC (Biology, Physics, Chemistry) Core',
                    description: 'Life sciences and pre-medical foundational track.',
                    careerPaths: ['MBBS / BDS', 'B.Pharm', 'Biotechnology', 'Allied Health', 'Veterinary Sciences']
                  }
                ]
              },
              {
                id: 'mbipc',
                title: 'MBiPC — Mathematics, Biology, Physics, Chemistry',
                code: 'MBiPC',
                category: 'Science',
                boardsAllowed: ['Telangana Intermediate (TSBIE)', 'CBSE', 'CISCE', 'Andhra Pradesh (BIEAP)', 'Other boards'],
                yearsAllowed: ['First Year (11th)', 'Second Year (12th)'],
                specializations: [
                  {
                    id: 'mbipc_core',
                    title: 'MBiPC (Maths, Biology, Physics, Chemistry) 4-Subject Dual Track',
                    description: 'Dual eligibility for both Engineering and Healthcare/Medical entrances.',
                    careerPaths: ['Biomedical Engineering', 'Bioinformatics', 'Medicine', 'Robotics Surgery tech', 'Biophysics']
                  }
                ]
              },
              {
                id: 'other_science',
                title: 'Other Science combinations',
                code: 'SCI-OTHER',
                category: 'Science',
                boardsAllowed: ['Telangana Intermediate (TSBIE)', 'CBSE', 'CISCE', 'Other boards'],
                yearsAllowed: ['First Year (11th)', 'Second Year (12th)'],
                specializations: [
                  {
                    id: 'other_science_spec',
                    title: 'Other Custom Science Combinations (Statistics, Geology, Electronics, etc.)',
                    description: 'Specialized state and international science tracks.',
                    careerPaths: ['Applied Sciences', 'Geosciences', 'Industrial Chemistry']
                  }
                ]
              }
            ]
          },
          {
            id: 'inter_commerce',
            title: 'Intermediate Commerce Stream',
            category: 'Commerce',
            branchesOrGroups: [
              {
                id: 'mec',
                title: 'MEC — Mathematics, Economics, Commerce',
                code: 'MEC',
                category: 'Commerce',
                boardsAllowed: ['Telangana Intermediate (TSBIE)', 'CBSE', 'CISCE', 'Andhra Pradesh (BIEAP)', 'Other boards'],
                yearsAllowed: ['First Year (11th)', 'Second Year (12th)'],
                specializations: [
                  {
                    id: 'mec_core',
                    title: 'MEC (Mathematics, Economics, Commerce)',
                    description: 'Quantitative commerce, micro/macro economics, financial calculations.',
                    careerPaths: ['CA / CMA / CS', 'BBA Finance', 'Actuarial Science', 'FinTech', 'Data Economics']
                  }
                ]
              },
              {
                id: 'cec',
                title: 'CEC — Civics, Economics, Commerce',
                code: 'CEC',
                category: 'Commerce',
                boardsAllowed: ['Telangana Intermediate (TSBIE)', 'CBSE', 'CISCE', 'Andhra Pradesh (BIEAP)', 'Other boards'],
                yearsAllowed: ['First Year (11th)', 'Second Year (12th)'],
                specializations: [
                  {
                    id: 'cec_core',
                    title: 'CEC (Civics, Economics, Commerce)',
                    description: 'Business studies, commercial law, constitutional civics, and economic policy.',
                    careerPaths: ['Corporate Law (BA LLB)', 'Public Policy', 'Banking & Insurance', 'Management', 'UPSC']
                  }
                ]
              },
              {
                id: 'hec',
                title: 'HEC — History, Economics, Civics',
                code: 'HEC',
                category: 'Humanities & Social Sciences',
                boardsAllowed: ['Telangana Intermediate (TSBIE)', 'CBSE', 'CISCE', 'Other boards'],
                yearsAllowed: ['First Year (11th)', 'Second Year (12th)'],
                specializations: [
                  {
                    id: 'hec_core',
                    title: 'HEC (History, Economics, Civics)',
                    description: 'Historical dynamics, constitutional institutions, governance, economic thought.',
                    careerPaths: ['Civil Services (IAS/IPS)', 'Law & Judiciary', 'Journalism', 'Archeology', 'Diplomacy']
                  }
                ]
              },
              {
                id: 'comm_ca',
                title: 'Commerce with Computer Applications, where offered',
                code: 'COMM-CA',
                category: 'Commerce',
                boardsAllowed: ['Telangana Intermediate (TSBIE)', 'CBSE', 'CISCE', 'Other boards'],
                yearsAllowed: ['First Year (11th)', 'Second Year (12th)'],
                specializations: [
                  {
                    id: 'comm_ca_spec',
                    title: 'Commerce with Computer Applications & IT',
                    description: 'Accounting systems, spreadsheets, ERP, and computerized commerce.',
                    careerPaths: ['B.Com Computer Applications', 'BCA', 'E-Commerce Management', 'Digital Accounting']
                  }
                ]
              },
              {
                id: 'other_commerce',
                title: 'Other Commerce combinations',
                code: 'COMM-OTHER',
                category: 'Commerce',
                boardsAllowed: ['Telangana Intermediate (TSBIE)', 'CBSE', 'CISCE', 'Other boards'],
                yearsAllowed: ['First Year (11th)', 'Second Year (12th)'],
                specializations: [
                  {
                    id: 'other_commerce_spec',
                    title: 'Other Commerce Combinations (Business Math, Informatics Practices, etc.)',
                    description: 'Custom commerce streams with business mathematics and informatics.',
                    careerPaths: ['Financial Markets', 'Stock Trading', 'Entrepreneurship']
                  }
                ]
              }
            ]
          },
          {
            id: 'inter_humanities_vocational',
            title: 'Intermediate Humanities and Vocational',
            category: 'Humanities & Vocational',
            branchesOrGroups: [
              {
                id: 'other_humanities',
                title: 'Other Humanities combinations',
                code: 'HUM-OTHER',
                boardsAllowed: ['Telangana Intermediate (TSBIE)', 'CBSE', 'CISCE', 'Other boards'],
                yearsAllowed: ['First Year (11th)', 'Second Year (12th)'],
                specializations: [
                  {
                    id: 'humanities_custom',
                    title: 'Humanities Combinations (Psychology, Sociology, Geography, Political Science)',
                    description: 'Social behavior, cultural studies, spatial analysis, and political theory.',
                    careerPaths: ['Clinical Psychology', 'Sociological Research', 'International Relations', 'Media & Content']
                  }
                ]
              },
              {
                id: 'vocational_inter',
                title: 'Intermediate Vocational courses',
                code: 'VOC-INTER',
                boardsAllowed: ['State Vocational Board', 'Telangana Intermediate Vocational', 'CBSE Vocational', 'Other boards'],
                yearsAllowed: ['First Year (11th)', 'Second Year (12th)'],
                specializations: [
                  {
                    id: 'voc_medical_lab',
                    title: 'Vocational Medical Lab Technology (MLT)',
                    description: 'Clinical pathology, laboratory safety, diagnostic instrumentation.',
                    careerPaths: ['Medical Technician', 'Diagnostic Centers', 'Hospital Laboratories']
                  },
                  {
                    id: 'voc_electronics',
                    title: 'Vocational Electronic & Communication Technician',
                    description: 'PCB repair, instrumentation, basic telecommunication hardware.',
                    careerPaths: ['Hardware Technician', 'Polytechnic Lateral Entry', 'Manufacturing Assembly']
                  },
                  {
                    id: 'voc_accounting_tax',
                    title: 'Vocational Accounting & Taxation',
                    description: 'Practical GST filing, Tally, payroll, and bookkeeping fundamentals.',
                    careerPaths: ['Junior Accountant', 'Tax Consultant Assistant', 'Commercial Services']
                  },
                  {
                    id: 'voc_agriculture',
                    title: 'Vocational Crop Production & Agriculture',
                    description: 'Soil management, irrigation, organic farming, and post-harvest technology.',
                    careerPaths: ['Agri-Business', 'Farm Operations', 'Seed Technology']
                  }
                ]
              },
              {
                id: 'custom_inter_group',
                title: 'Other Specialization / Custom Subject Combination',
                code: 'INTER-CUSTOM',
                boardsAllowed: ['Telangana Intermediate (TSBIE)', 'Andhra Pradesh (BIEAP)', 'CBSE', 'CISCE', 'State Boards', 'IB / Cambridge', 'Other boards'],
                yearsAllowed: ['First Year (11th)', 'Second Year (12th)'],
                specializations: [
                  {
                    id: 'custom_inter_spec',
                    title: 'Other Specialization / Custom Subject Combination',
                    description: 'Enter your custom subjects (e.g., Mathematics, Biology, Computer Science, Economics, History) to receive an assessment tailored to those subjects plus 10 Aptitude questions.',
                    careerPaths: ['Higher Studies', 'Interdisciplinary Careers', 'Competitive Entrance Exams', 'Skill Development']
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  // 3. DIPLOMA / POLYTECHNIC (All 61 specializations)
  {
    id: 'diploma',
    name: 'Diploma / Polytechnic',
    shortLabel: 'Diploma / Polytechnic',
    description: '3-year professional polytechnic and technician diplomas across engineering, health & services.',
    iconName: 'Wrench',
    qualifications: [
      {
        id: 'polytechnic_diploma',
        title: 'State Board of Technical Education Diploma (Polytechnic)',
        courses: [
          {
            id: 'diploma_it_cluster',
            title: 'Computer and Information Technology',
            branchesOrGroups: [
              {
                id: 'dip_comp_it',
                title: 'Computer & IT Polytechnic Group',
                yearsAllowed: ['1st Year', '2nd Year', '3rd Year'],
                semestersAllowed: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6'],
                specializations: [
                  { id: 'dip_1', title: '1. Computer Engineering' },
                  { id: 'dip_2', title: '2. Computer Science and Engineering' },
                  { id: 'dip_3', title: '3. Information Technology' },
                  { id: 'dip_4', title: '4. Artificial Intelligence and Machine Learning' },
                  { id: 'dip_5', title: '5. Data Science' },
                  { id: 'dip_6', title: '6. Cybersecurity' },
                  { id: 'dip_7', title: '7. Cloud Computing' },
                  { id: 'dip_8', title: '8. Software Development' },
                  { id: 'dip_9', title: '9. Computer Applications' },
                  { id: 'dip_10', title: '10. Internet of Things' },
                  { id: 'dip_11', title: '11. Blockchain Technology' },
                  { id: 'dip_12', title: '12. Networking' },
                  { id: 'dip_13', title: '13. Other Computer / IT specialization' }
                ]
              }
            ]
          },
          {
            id: 'diploma_ece_eee_cluster',
            title: 'Electronics and Electrical',
            branchesOrGroups: [
              {
                id: 'dip_elec_group',
                title: 'Electronics & Electrical Polytechnic Group',
                yearsAllowed: ['1st Year', '2nd Year', '3rd Year'],
                semestersAllowed: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6'],
                specializations: [
                  { id: 'dip_14', title: '14. Electronics and Communication Engineering (ECE)' },
                  { id: 'dip_15', title: '15. Electrical and Electronics Engineering (EEE)' },
                  { id: 'dip_16', title: '16. Electronics Engineering' },
                  { id: 'dip_17', title: '17. Instrumentation and Control Engineering' },
                  { id: 'dip_18', title: '18. VLSI Design' },
                  { id: 'dip_19', title: '19. Embedded Systems' },
                  { id: 'dip_20', title: '20. Digital Electronics' },
                  { id: 'dip_21', title: '21. Telecommunications' },
                  { id: 'dip_22', title: '22. Other Electronics / Electrical specialization' }
                ]
              }
            ]
          },
          {
            id: 'diploma_core_engg_cluster',
            title: 'Core Engineering',
            branchesOrGroups: [
              {
                id: 'dip_core_group',
                title: 'Core Engineering Polytechnic Group',
                yearsAllowed: ['1st Year', '2nd Year', '3rd Year'],
                semestersAllowed: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6'],
                specializations: [
                  { id: 'dip_23', title: '23. Mechanical Engineering' },
                  { id: 'dip_24', title: '24. Civil Engineering' },
                  { id: 'dip_25', title: '25. Automobile Engineering' },
                  { id: 'dip_26', title: '26. Chemical Engineering' },
                  { id: 'dip_27', title: '27. Aerospace Engineering' },
                  { id: 'dip_28', title: '28. Aeronautical Engineering' },
                  { id: 'dip_29', title: '29. Mechatronics' },
                  { id: 'dip_30', title: '30. Robotics and Automation' },
                  { id: 'dip_31', title: '31. Industrial Engineering' },
                  { id: 'dip_32', title: '32. Production Engineering' },
                  { id: 'dip_33', title: '33. Manufacturing Engineering' },
                  { id: 'dip_34', title: '34. Mining Engineering' },
                  { id: 'dip_35', title: '35. Metallurgical Engineering' },
                  { id: 'dip_36', title: '36. Petroleum Engineering' },
                  { id: 'dip_37', title: '37. Agricultural Engineering' },
                  { id: 'dip_38', title: '38. Environmental Engineering' },
                  { id: 'dip_39', title: '39. Biomedical Engineering' },
                  { id: 'dip_40', title: '40. Food Technology' },
                  { id: 'dip_41', title: '41. Textile Technology' },
                  { id: 'dip_42', title: '42. Architecture / Architectural Assistantship' },
                  { id: 'dip_43', title: '43. Marine Engineering' },
                  { id: 'dip_44', title: '44. Other Engineering specialization' }
                ]
              }
            ]
          },
          {
            id: 'diploma_health_cluster',
            title: 'Medical and Allied Health',
            branchesOrGroups: [
              {
                id: 'dip_health_group',
                title: 'Allied Health Polytechnic Group',
                yearsAllowed: ['1st Year', '2nd Year', '3rd Year'],
                semestersAllowed: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6'],
                specializations: [
                  { id: 'dip_45', title: '45. Medical Laboratory Technology (MLT / DMLT)' },
                  { id: 'dip_46', title: '46. Medical Imaging Technology' },
                  { id: 'dip_47', title: '47. Radiology Technology' },
                  { id: 'dip_48', title: '48. Operation Theatre Technology' },
                  { id: 'dip_49', title: '49. Dialysis Technology' },
                  { id: 'dip_50', title: '50. Physiotherapy' },
                  { id: 'dip_51', title: '51. Medical Records Technology' },
                  { id: 'dip_52', title: '52. Pharmacy' },
                  { id: 'dip_53', title: '53. Nursing, where offered' },
                  { id: 'dip_54', title: '54. Emergency Medical Technology' },
                  { id: 'dip_55', title: '55. Other Allied Health specializations' }
                ]
              }
            ]
          },
          {
            id: 'diploma_other_courses',
            title: 'Other Diploma Courses',
            branchesOrGroups: [
              {
                id: 'dip_other_group',
                title: 'Vocational & Management Diploma Group',
                yearsAllowed: ['1st Year', '2nd Year', '3rd Year'],
                semestersAllowed: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6'],
                specializations: [
                  { id: 'dip_56', title: '56. Business Administration' },
                  { id: 'dip_57', title: '57. Hotel Management' },
                  { id: 'dip_58', title: '58. Tourism Management' },
                  { id: 'dip_59', title: '59. Logistics and Supply Chain Management' },
                  { id: 'dip_60', title: '60. Fashion and Textile' },
                  { id: 'dip_61', title: '61. Other Technical / Vocational Diploma' }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  // 4. UNDERGRADUATE DEGREE (BBA, BCA, B.Com, B.Sc., B.E./B.Tech, BA)
  {
    id: 'undergraduate',
    name: 'Undergraduate Degree',
    shortLabel: 'Undergraduate (UG)',
    description: '3-year & 4-year bachelor degrees across Management, Computing, Commerce, Sciences, Engineering, and Arts.',
    iconName: 'Award',
    qualifications: [
      {
        id: 'ug_degrees',
        title: 'Bachelor Degrees (UG)',
        courses: [
          // A. BBA
          {
            id: 'ug_bba',
            title: 'BBA — Bachelor of Business Administration',
            code: 'BBA',
            branchesOrGroups: [
              {
                id: 'bba_specializations',
                title: 'BBA Specialization Tracks',
                yearsAllowed: ['1st Year', '2nd Year', '3rd Year'],
                semestersAllowed: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6'],
                specializations: [
                  { id: 'bba_1', title: '1. BBA General' },
                  { id: 'bba_2', title: '2. BBA Finance' },
                  { id: 'bba_3', title: '3. BBA Marketing' },
                  { id: 'bba_4', title: '4. BBA Human Resource Management (HRM)' },
                  { id: 'bba_5', title: '5. BBA Retail Management' },
                  { id: 'bba_6', title: '6. BBA International Business' },
                  { id: 'bba_7', title: '7. BBA Business Analytics' },
                  { id: 'bba_8', title: '8. BBA Entrepreneurship' },
                  { id: 'bba_9', title: '9. BBA Digital Marketing' },
                  { id: 'bba_10', title: '10. BBA Banking and Insurance' },
                  { id: 'bba_11', title: '11. BBA Logistics and Supply Chain Management' },
                  { id: 'bba_12', title: '12. BBA Operations Management' },
                  { id: 'bba_13', title: '13. BBA Tourism and Hospitality Management' },
                  { id: 'bba_14', title: '14. BBA Healthcare Management' },
                  { id: 'bba_15', title: '15. BBA Event Management' },
                  { id: 'bba_16', title: '16. BBA E-Commerce' },
                  { id: 'bba_17', title: '17. BBA Family Business Management' },
                  { id: 'bba_18', title: '18. BBA Financial Services' },
                  { id: 'bba_19', title: '19. BBA Investment Management' },
                  { id: 'bba_20', title: '20. BBA FinTech' },
                  { id: 'bba_21', title: '21. BBA Business Intelligence' },
                  { id: 'bba_22', title: '22. BBA Other Specialization' }
                ]
              }
            ]
          },
          // B. BCA
          {
            id: 'ug_bca',
            title: 'BCA — Bachelor of Computer Applications',
            code: 'BCA',
            branchesOrGroups: [
              {
                id: 'bca_specializations',
                title: 'BCA Specialization Tracks',
                yearsAllowed: ['1st Year', '2nd Year', '3rd Year'],
                semestersAllowed: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6'],
                specializations: [
                  { id: 'bca_1', title: '1. BCA General' },
                  { id: 'bca_2', title: '2. BCA Computer Science' },
                  { id: 'bca_3', title: '3. BCA Information Technology' },
                  { id: 'bca_4', title: '4. BCA Artificial Intelligence' },
                  { id: 'bca_5', title: '5. BCA Artificial Intelligence and Machine Learning' },
                  { id: 'bca_6', title: '6. BCA Data Science' },
                  { id: 'bca_7', title: '7. BCA Cybersecurity' },
                  { id: 'bca_8', title: '8. BCA Cloud Computing' },
                  { id: 'bca_9', title: '9. BCA Software Development' },
                  { id: 'bca_10', title: '10. BCA Web Development' },
                  { id: 'bca_11', title: '11. BCA Internet of Things' },
                  { id: 'bca_12', title: '12. BCA Blockchain Technology' },
                  { id: 'bca_13', title: '13. BCA Mobile Application Development' },
                  { id: 'bca_14', title: '14. BCA Computer Networks' },
                  { id: 'bca_15', title: '15. BCA Database Management' },
                  { id: 'bca_16', title: '16. BCA Gaming and Animation' },
                  { id: 'bca_17', title: '17. BCA Computer Applications' },
                  { id: 'bca_18', title: '18. BCA Other Specialization' }
                ]
              }
            ]
          },
          // C. B.Com.
          {
            id: 'ug_bcom',
            title: 'B.Com. — Bachelor of Commerce',
            code: 'B.Com',
            branchesOrGroups: [
              {
                id: 'bcom_specializations',
                title: 'B.Com Specialization Tracks',
                yearsAllowed: ['1st Year', '2nd Year', '3rd Year'],
                semestersAllowed: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6'],
                specializations: [
                  { id: 'bcom_1', title: '1. B.Com General' },
                  { id: 'bcom_2', title: '2. B.Com Computer Applications' },
                  { id: 'bcom_3', title: '3. B.Com Finance' },
                  { id: 'bcom_4', title: '4. B.Com Accounting and Finance' },
                  { id: 'bcom_5', title: '5. B.Com Banking and Insurance' },
                  { id: 'bcom_6', title: '6. B.Com Business Analytics' },
                  { id: 'bcom_7', title: '7. B.Com International Business' },
                  { id: 'bcom_8', title: '8. B.Com Taxation' },
                  { id: 'bcom_9', title: '9. B.Com Financial Markets' },
                  { id: 'bcom_10', title: '10. B.Com Corporate Secretaryship' },
                  { id: 'bcom_11', title: '11. B.Com E-Commerce' },
                  { id: 'bcom_12', title: '12. B.Com Professional Accounting' },
                  { id: 'bcom_13', title: '13. B.Com Business Management' },
                  { id: 'bcom_14', title: '14. B.Com Investment Management' },
                  { id: 'bcom_15', title: '15. B.Com FinTech' },
                  { id: 'bcom_16', title: '16. B.Com Other Specialization' }
                ]
              }
            ]
          },
          // D. B.Sc. Groups & Combinations (Section 8: A, B, C, D)
          {
            id: 'ug_bsc',
            title: 'B.Sc. — Bachelor of Science (All Combinations)',
            code: 'B.Sc',
            branchesOrGroups: [
              {
                id: 'bsc_physical_tech',
                title: 'Physical Science & Technology',
                yearsAllowed: ['1st Year', '2nd Year', '3rd Year'],
                semestersAllowed: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6'],
                specializations: [
                  { id: 'bsc_pst_phys', title: 'B.Sc. Physics', description: 'Classical mechanics, quantum physics, thermodynamics, electromagnetism, and optics.' },
                  { id: 'bsc_pst_math', title: 'B.Sc. Mathematics', description: 'Real and complex analysis, linear algebra, differential equations, and abstract algebra.' },
                  { id: 'bsc_pst_chem', title: 'B.Sc. Chemistry', description: 'Organic, inorganic, and physical chemistry, spectroscopy, and analytical chemistry.' },
                  { id: 'bsc_pst_elec', title: 'B.Sc. Electronics', description: 'Analog/digital circuits, semiconductor devices, microprocessors, and communication systems.' },
                  { id: 'bsc_pst_stats', title: 'B.Sc. Statistics', description: 'Probability distributions, statistical inference, regression models, and stochastic processes.' },
                  { id: 'bsc_pst_cs', title: 'B.Sc. Computer Science', description: 'Algorithms, data structures, operating systems, software engineering, and database systems.' },
                  { id: 'bsc_pst_it', title: 'B.Sc. Information Technology', description: 'Network administration, cloud computing, cybersecurity fundamentals, and enterprise IT.' },
                  { id: 'bsc_pst_ds', title: 'B.Sc. Data Science', description: 'Machine learning, predictive analytics, data visualization, and statistical modeling with Python/R.' },
                  { id: 'bsc_pst_ai', title: 'B.Sc. Artificial Intelligence', description: 'Neural networks, deep learning, computer vision, natural language processing, and AI ethics.' },
                  { id: 'bsc_pst_cs_ai', title: 'B.Sc. Computer Science & AI', description: 'Core computer science principles integrated with advanced artificial intelligence.' },
                  { id: 'bsc_pst_cs_ds', title: 'B.Sc. Computer Science & Data Science', description: 'Computational theory, big data systems, statistical computation, and data engineering.' }
                ]
              },
              {
                id: 'bsc_math_stats_cs',
                title: 'Mathematics, Statistics, and Computer Science Combinations',
                yearsAllowed: ['1st Year', '2nd Year', '3rd Year'],
                semestersAllowed: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6'],
                specializations: [
                  { id: 'bsc_1', title: '1. MSDS — Mathematics, Statistics and Data Science' },
                  { id: 'bsc_2', title: '2. MSCS — Mathematics, Statistics and Computer Science' },
                  { id: 'bsc_3', title: '3. MSDC — Mathematics, Statistics and Data Computing' },
                  { id: 'bsc_4', title: '4. MPCS — Mathematics, Physics and Computer Science' },
                  { id: 'bsc_5', title: '5. MECS — Mathematics, Electronics and Computer Science' },
                  { id: 'bsc_6', title: '6. MCDE — Mathematics, Computer Science and Digital Electronics' },
                  { id: 'bsc_7', title: '7. Mathematics, Statistics and Artificial Intelligence' },
                  { id: 'bsc_8', title: '8. Mathematics, Statistics and Machine Learning' },
                  { id: 'bsc_9', title: '9. Mathematics, Computer Science and Artificial Intelligence' },
                  { id: 'bsc_10', title: '10. Mathematics, Computer Science and Data Science' },
                  { id: 'bsc_11', title: '11. Mathematics, Electronics and Statistics' },
                  { id: 'bsc_12', title: '12. Mathematics, Physics and Electronics' },
                  { id: 'bsc_13', title: '13. Mathematics, Statistics and Economics' },
                  { id: 'bsc_14', title: '14. Mathematics, Statistics and Computer Applications' },
                  { id: 'bsc_15', title: '15. Other Mathematics / Computer Science combinations' }
                ]
              },
              {
                id: 'bsc_biological_sciences',
                title: 'Life Science & Biological Sciences',
                yearsAllowed: ['1st Year', '2nd Year', '3rd Year'],
                semestersAllowed: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6'],
                specializations: [
                  { id: 'ug_bio_1', title: 'B.Sc. Biology', description: 'Comprehensive biological systems, cell biology, organismal diversity, and evolutionary ecology.' },
                  { id: 'ug_bio_2', title: 'B.Sc. Botany', description: 'Plant anatomy, morphology, physiology, economic botany, and plant molecular systematics.' },
                  { id: 'ug_bio_3', title: 'B.Sc. Zoology', description: 'Animal physiology, vertebrate anatomy, endocrinology, developmental biology, and animal behavior.' },
                  { id: 'ug_bio_4', title: 'B.Sc. Biotechnology', description: 'Recombinant DNA technology, tissue culture, bioprocess kinetics, and genetic manipulation.' },
                  { id: 'ug_bio_5', title: 'B.Sc. Microbiology', description: 'Bacteriology, virology, immunology, industrial fermentation, and microbial genetics.' },
                  { id: 'ug_bio_6', title: 'B.Sc. Biochemistry', description: 'Enzymology, bioenergetics, structural biology, metabolic pathways, and clinical bio-analysis.' },
                  { id: 'ug_bio_7', title: 'B.Sc. Genetics', description: 'Mendelian principles, population genetics, cytogenetics, epigenetics, and genome analysis.' },
                  { id: 'ug_bio_8', title: 'B.Sc. Bioinformatics', description: 'Computational sequence alignment, genomics, proteomics, phylogenetic trees, and structural modeling.' },
                  { id: 'ug_bio_9', title: 'B.Sc. Biomedical Science', description: 'Human cellular pathology, molecular medicine, immunology diagnostics, and disease mechanisms.' },
                  { id: 'ug_bio_10', title: 'B.Sc. Forensic Science', description: 'Forensic toxicology, DNA fingerprinting, crime scene analysis, ballistics, and trace evidence.' },
                  { id: 'ug_bio_11', title: 'B.Sc. Nutrition & Dietetics', description: 'Human nutrition, clinical dietetics, therapeutic nutrition planning, and metabolic nourishment.' },
                  { id: 'ug_bio_12', title: 'B.Sc. Food Science and Technology', description: 'Food chemistry, industrial preservation, packaging, and food quality safety standards.' },
                  { id: 'ug_bio_13', title: 'B.Sc. Environmental Science', description: 'Ecosystem ecology, conservation biology, environmental toxicogenomics, and climate science.' },
                  { id: 'ug_bio_14', title: 'BZC — Botany, Zoology and Chemistry', description: 'Classical tri-disciplinary foundation in plant biology, animal sciences, and organic chemistry.' },
                  { id: 'ug_bio_15', title: 'Other Biological Sciences combination', description: 'Custom undergraduate biological, agricultural, marine, or life science track.' }
                ]
              },
              {
                id: 'bsc_general_science',
                title: 'General Science Combinations',
                yearsAllowed: ['1st Year', '2nd Year', '3rd Year'],
                semestersAllowed: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6'],
                specializations: [
                  { id: 'bsc_16', title: '16. B.Sc. Mathematics' },
                  { id: 'bsc_17', title: '17. B.Sc. Physics' },
                  { id: 'bsc_18', title: '18. B.Sc. Chemistry' },
                  { id: 'bsc_19', title: '19. MPC — Mathematics, Physics and Chemistry' },
                  { id: 'bsc_20', title: '20. BZC — Botany, Zoology and Chemistry' },
                  { id: 'bsc_21', title: '21. Botany, Zoology and Microbiology' },
                  { id: 'bsc_22', title: '22. Botany, Zoology and Biotechnology' },
                  { id: 'bsc_23', title: '23. Botany, Zoology and Genetics' },
                  { id: 'bsc_bio_core', title: 'B.Sc. Biology' },
                  { id: 'bsc_24', title: '24. B.Sc. Botany' },
                  { id: 'bsc_25', title: '25. B.Sc. Zoology' },
                  { id: 'bsc_26', title: '26. B.Sc. Biotechnology' },
                  { id: 'bsc_27', title: '27. B.Sc. Microbiology' },
                  { id: 'bsc_28', title: '28. B.Sc. Biochemistry' },
                  { id: 'bsc_29', title: '29. B.Sc. Genetics' },
                  { id: 'bsc_bioinfo', title: 'B.Sc. Bioinformatics' },
                  { id: 'bsc_biomed', title: 'B.Sc. Biomedical Science' },
                  { id: 'bsc_30', title: '30. B.Sc. Environmental Science' },
                  { id: 'bsc_31', title: '31. B.Sc. Forensic Science' },
                  { id: 'bsc_32', title: '32. B.Sc. Food Science and Technology' },
                  { id: 'bsc_33', title: '33. B.Sc. Nutrition and Dietetics' },
                  { id: 'bsc_34', title: '34. B.Sc. Agriculture' },
                  { id: 'bsc_35', title: '35. B.Sc. Horticulture' },
                  { id: 'bsc_36', title: '36. B.Sc. Sericulture' },
                  { id: 'bsc_37', title: '37. B.Sc. Geology' },
                  { id: 'bsc_38', title: '38. B.Sc. Geography' },
                  { id: 'bsc_39', title: '39. B.Sc. Psychology' },
                  { id: 'bsc_40', title: '40. B.Sc. Home Science' },
                  { id: 'bsc_41', title: '41. B.Sc. Electronics' },
                  { id: 'bsc_42', title: '42. B.Sc. Instrumentation' },
                  { id: 'bsc_43', title: '43. B.Sc. Industrial Chemistry' },
                  { id: 'bsc_44', title: '44. Other Science combinations' }
                ]
              },
              {
                id: 'bsc_cs_ds',
                title: 'Computer Science and Data Science',
                yearsAllowed: ['1st Year', '2nd Year', '3rd Year'],
                semestersAllowed: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6'],
                specializations: [
                  { id: 'bsc_45', title: '45. B.Sc. Computer Science' },
                  { id: 'bsc_46', title: '46. B.Sc. Information Technology' },
                  { id: 'bsc_47', title: '47. B.Sc. Data Science' },
                  { id: 'bsc_48', title: '48. B.Sc. Artificial Intelligence' },
                  { id: 'bsc_49', title: '49. B.Sc. Artificial Intelligence and Machine Learning' },
                  { id: 'bsc_50', title: '50. B.Sc. Cybersecurity' },
                  { id: 'bsc_51', title: '51. B.Sc. Computer Applications' },
                  { id: 'bsc_52', title: '52. B.Sc. Cloud Computing' },
                  { id: 'bsc_53', title: '53. B.Sc. Software Development' },
                  { id: 'bsc_54', title: '54. B.Sc. Information Systems' },
                  { id: 'bsc_55', title: '55. B.Sc. Computer Technology' },
                  { id: 'bsc_56', title: '56. B.Sc. Statistics' },
                  { id: 'bsc_57', title: '57. B.Sc. Computational Mathematics' },
                  { id: 'bsc_58', title: '58. Other Computer Science specialization' }
                ]
              },
              {
                id: 'bsc_medical_allied',
                title: 'Medical, Healthcare & Allied Sciences',
                yearsAllowed: ['1st Year', '2nd Year', '3rd Year', '4th Year'],
                semestersAllowed: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8'],
                specializations: [
                  { id: 'bsc_70', title: 'B.Sc. Nursing', description: 'Patient care, maternal-child health, pharmacological administration, and community health nursing.' },
                  { id: 'bsc_59', title: 'B.Sc. Medical Laboratory Technology (MLT/MLS)', description: 'Clinical biochemistry, hematology, histopathology, immunohematology, and automated diagnostic analyzers.' },
                  { id: 'bsc_61', title: 'B.Sc. Medical Imaging Technology', description: 'Diagnostic radiography, CT scanning, MRI physics, ultrasound principles, and radiation safety protocols.' },
                  { id: 'bsc_62', title: 'B.Sc. Radiology & Imaging', description: 'High-resolution computed tomography, magnetic resonance imaging, interventional radiology, and radiation oncology.' },
                  { id: 'bsc_63', title: 'B.Sc. Anesthesia Technology', description: 'Pre-operative anesthesia workstation setup, airway management, intra-operative vital monitoring, and recovery protocols.' },
                  { id: 'bsc_64', title: 'B.Sc. Operation Theatre Technology', description: 'Surgical sterilization techniques, OT equipment prep, aseptic protocols, and intra-operative surgical assistance.' },
                  { id: 'bsc_67', title: 'B.Sc. Cardiac Technology', description: 'Electrocardiography (ECG), echocardiography, cardiac catheterization lab support, and cardiovascular hemodynamics.' },
                  { id: 'bsc_65', title: 'B.Sc. Dialysis Technology', description: 'Hemodialysis machinery management, peritoneal dialysis protocols, dialyzer reprocessing, and vascular access maintenance.' },
                  { id: 'bsc_66', title: 'B.Sc. Respiratory Therapy', description: 'Mechanical ventilator management, arterial blood gas analysis, aerosol medication delivery, and pulmonary rehabilitation.' },
                  { id: 'bsc_68', title: 'B.Sc. Optometry', description: 'Visual acuity refraction, corneal contact lenses, binocular vision therapy, and ocular disease detection.' },
                  { id: 'bsc_69', title: 'B.Sc. Physiotherapy', description: 'Musculoskeletal rehabilitation, neurological physical therapy, cardiopulmonary reconditioning, and biomechanics.' },
                  { id: 'bsc_med_allied_nutr', title: 'B.Sc. Nutrition & Dietetics', description: 'Clinical nutrition assessment, therapeutic meal design, metabolic care, and community dietetics.' },
                  { id: 'bsc_med_allied_clin_nutr', title: 'B.Sc. Clinical Nutrition', description: 'Hospital-based clinical nutrition, enteral and parenteral feeding, and critical patient dietetics.' },
                  { id: 'bsc_med_allied_food', title: 'B.Sc. Food Science & Technology', description: 'Food processing systems, nutritional analysis, food preservation, and quality compliance.' },
                  { id: 'bsc_med_allied_pubhealth', title: 'B.Sc. Public Health', description: 'Community health surveillance, epidemiology, disease prevention strategies, and healthcare policy.' },
                  { id: 'bsc_72', title: 'B.Sc. Clinical Research', description: 'GCP guidelines, clinical trial phase management, pharmacovigilance, and patient protocol compliance.' },
                  { id: 'bsc_71', title: 'B.Sc. Emergency Medical Technology', description: 'Pre-hospital emergency care, trauma triage, advanced cardiac life support (ACLS), and disaster medicine.' },
                  { id: 'bsc_73', title: 'B.Sc. Health Information Management', description: 'Electronic health records, ICD medical coding, patient data privacy, and hospital information informatics.' },
                  { id: 'bsc_74', title: 'Other Allied Health Sciences', description: 'Custom medical diagnostic, rehabilitation, or paramedical bachelor specialty.' }
                ]
              },
              {
                id: 'bsc_applied_professional',
                title: 'Applied & Professional Sciences',
                yearsAllowed: ['1st Year', '2nd Year', '3rd Year', '4th Year'],
                semestersAllowed: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8'],
                specializations: [
                  { id: 'bsc_app_agri', title: 'B.Sc. Agriculture', description: 'Agronomy, crop physiology, soil science, agricultural entomology, and sustainable farming.' },
                  { id: 'bsc_app_env', title: 'B.Sc. Environmental Science', description: 'Ecology, biodiversity conservation, pollution mitigation, and environmental impact assessment.' },
                  { id: 'bsc_app_psych', title: 'B.Sc. Psychology', description: 'Cognitive psychology, behavioral neuroscience, developmental stages, and psychological assessment.' },
                  { id: 'bsc_app_anim', title: 'B.Sc. Animation & Multimedia', description: '3D modeling, visual effects (VFX), digital rendering, character animation, and interactive media.' },
                  { id: 'bsc_app_geog', title: 'B.Sc. Geography', description: 'Geomorphology, climatology, GIS spatial analysis, cartography, and human geography.' },
                  { id: 'bsc_app_geol', title: 'B.Sc. Geology', description: 'Mineralogy, structural geology, stratigraphy, paleontology, and hydrogeology.' },
                  { id: 'bsc_app_hort', title: 'B.Sc. Horticulture', description: 'Pomology, olericulture, floriculture, landscape architecture, and greenhouse crop management.' },
                  { id: 'bsc_app_fish', title: 'B.Sc. Fisheries Science', description: 'Aquaculture technology, fish biology, marine capture fisheries, and aquatic resource management.' },
                  { id: 'bsc_app_foodtech', title: 'B.Sc. Food Technology', description: 'Food processing engineering, thermal preservation, product formulation, and food plant operations.' },
                  { id: 'bsc_app_other', title: 'Other Applied & Professional Science', description: 'Custom applied scientific discipline or emerging professional science pathway.' }
                ]
              },
              {
                id: 'bsc_combinations',
                title: 'B.Sc. Subject Combinations',
                yearsAllowed: ['1st Year', '2nd Year', '3rd Year'],
                semestersAllowed: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6'],
                specializations: [
                  { id: 'bsc_comb_mpc', title: 'MPC: Mathematics, Physics, Chemistry', description: 'Classic tri-subject physical science foundation with theoretical and laboratory rigor.' },
                  { id: 'bsc_comb_mpcs', title: 'MPCS: Mathematics, Physics, Computer Science', description: 'Interdisciplinary mathematical physics and computer algorithms/software architecture.' },
                  { id: 'bsc_comb_mpcs_stats', title: 'MPCS with Statistics where offered', description: 'Math, Physics, Computer Science integrated with statistical analysis and modeling.' },
                  { id: 'bsc_comb_mscs', title: 'MSCS: Mathematics, Statistics, Computer Science', description: 'Quantitative computing combination ideal for software engineering, analytics, and FinTech.' },
                  { id: 'bsc_comb_msds', title: 'MSDS: Mathematics, Statistics, Data Science', description: 'Specialized foundation in statistical inference, algorithmic modeling, and machine learning.' },
                  { id: 'bsc_comb_msdc', title: 'MSDC: Mathematics, Statistics, Data Computing', description: 'Applied mathematical computation, numerical methods, and enterprise data processing.' },
                  { id: 'bsc_comb_bzc', title: 'BZC: Botany, Zoology, Chemistry', description: 'Traditional biological sciences track preparing students for research and pharmaceutical fields.' },
                  { id: 'bsc_comb_bzmb', title: 'BZMB: Botany, Zoology, Microbiology, Biotechnology', description: 'Integrated biological sciences curriculum spanning classical biology and advanced biotechnology.' },
                  { id: 'bsc_comb_pcb', title: 'PCB: Physics, Chemistry, Biology', description: 'Comprehensive natural science combination bridging physical chemistry with biological systems.' },
                  { id: 'bsc_comb_other', title: 'Other Science Combination / Custom Combination', description: 'Custom multi-disciplinary state or university science combinations.' }
                ]
              },
              {
                id: 'bsc_study_track',
                title: 'B.Sc. Study Type & Degree Tracks',
                yearsAllowed: ['1st Year', '2nd Year', '3rd Year', '4th Year'],
                semestersAllowed: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8'],
                specializations: [
                  { id: 'bsc_track_general', title: 'B.Sc. General / Pass', description: '3-year standard degree curriculum providing broad foundational training across chosen subject clusters.' },
                  { id: 'bsc_track_honours', title: 'B.Sc. Honours', description: 'Advanced specialized bachelor degree with deeper theoretical coursework and dedicated major concentration.' },
                  { id: 'bsc_track_honours_res', title: 'B.Sc. Honours with Research', description: '4-year NEP-aligned honours degree incorporating independent laboratory dissertation and research papers.' },
                  { id: 'bsc_track_other', title: 'Other / Not Listed', description: 'Custom degree track, dual degree, or autonomous collegiate degree format.' }
                ]
              }
            ]
          },
          // E. B.E. / B.Tech. Engineering Branches (Section 9: 1 to 55)
          {
            id: 'ug_btech',
            title: 'B.E. / B.Tech. — Engineering & Technology',
            code: 'B.Tech',
            branchesOrGroups: [
              {
                id: 'btech_cse_it',
                title: 'Computer Science and IT Branches',
                yearsAllowed: ['1st Year', '2nd Year', '3rd Year', '4th Year'],
                semestersAllowed: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8'],
                specializations: [
                  { id: 'btech_1', title: '1. Computer Science and Engineering (CSE)' },
                  { id: 'btech_2', title: '2. CSE Artificial Intelligence and Machine Learning' },
                  { id: 'btech_3', title: '3. CSE Data Science' },
                  { id: 'btech_4', title: '4. CSE Cybersecurity' },
                  { id: 'btech_5', title: '5. CSE Internet of Things' },
                  { id: 'btech_6', title: '6. CSE Cloud Computing' },
                  { id: 'btech_7', title: '7. CSE Software Engineering' },
                  { id: 'btech_8', title: '8. CSE Information Security' },
                  { id: 'btech_9', title: '9. Information Technology (IT)' },
                  { id: 'btech_10', title: '10. Artificial Intelligence' },
                  { id: 'btech_11', title: '11. Machine Learning' },
                  { id: 'btech_12', title: '12. Data Science' },
                  { id: 'btech_13', title: '13. Computer Engineering' },
                  { id: 'btech_14', title: '14. Computer Science and Business Systems' },
                  { id: 'btech_15', title: '15. Computer Science and Design' },
                  { id: 'btech_16', title: '16. Blockchain Technology' },
                  { id: 'btech_17', title: '17. Other CSE / IT specialization' }
                ]
              },
              {
                id: 'btech_ece_eee',
                title: 'Electronics and Electrical Branches',
                yearsAllowed: ['1st Year', '2nd Year', '3rd Year', '4th Year'],
                semestersAllowed: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8'],
                specializations: [
                  { id: 'btech_18', title: '18. Electronics and Communication Engineering (ECE)' },
                  { id: 'btech_19', title: '19. Electrical and Electronics Engineering (EEE)' },
                  { id: 'btech_20', title: '20. Electronics Engineering' },
                  { id: 'btech_21', title: '21. Electronics and Instrumentation Engineering' },
                  { id: 'btech_22', title: '22. Instrumentation and Control Engineering' },
                  { id: 'btech_23', title: '23. VLSI Design and Technology' },
                  { id: 'btech_24', title: '24. Embedded Systems' },
                  { id: 'btech_25', title: '25. Telecommunications' },
                  { id: 'btech_26', title: '26. Signal Processing' },
                  { id: 'btech_27', title: '27. Robotics and Automation' },
                  { id: 'btech_28', title: '28. Electrical Engineering' },
                  { id: 'btech_29', title: '29. Mechatronics Engineering' },
                  { id: 'btech_30', title: '30. Other Electronics / Electrical specialization' }
                ]
              },
              {
                id: 'btech_core_engg',
                title: 'Core Engineering Branches',
                yearsAllowed: ['1st Year', '2nd Year', '3rd Year', '4th Year'],
                semestersAllowed: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8'],
                specializations: [
                  { id: 'btech_31', title: '31. Mechanical Engineering' },
                  { id: 'btech_32', title: '32. Civil Engineering' },
                  { id: 'btech_33', title: '33. Chemical Engineering' },
                  { id: 'btech_34', title: '34. Aerospace Engineering' },
                  { id: 'btech_35', title: '35. Aeronautical Engineering' },
                  { id: 'btech_36', title: '36. Automobile Engineering' },
                  { id: 'btech_37', title: '37. Industrial Engineering' },
                  { id: 'btech_38', title: '38. Production Engineering' },
                  { id: 'btech_39', title: '39. Manufacturing Engineering' },
                  { id: 'btech_40', title: '40. Metallurgical Engineering' },
                  { id: 'btech_41', title: '41. Mining Engineering' },
                  { id: 'btech_42', title: '42. Petroleum Engineering' },
                  { id: 'btech_43', title: '43. Agricultural Engineering' },
                  { id: 'btech_44', title: '44. Environmental Engineering' },
                  { id: 'btech_45', title: '45. Biomedical Engineering' },
                  { id: 'btech_46', title: '46. Biotechnology Engineering' },
                  { id: 'btech_47', title: '47. Food Technology' },
                  { id: 'btech_48', title: '48. Textile Technology' },
                  { id: 'btech_49', title: '49. Marine Engineering' },
                  { id: 'btech_50', title: '50. Naval Architecture' },
                  { id: 'btech_51', title: '51. Architectural Engineering' },
                  { id: 'btech_52', title: '52. Engineering Physics' },
                  { id: 'btech_53', title: '53. Energy Engineering' },
                  { id: 'btech_54', title: '54. Materials Science and Engineering' },
                  { id: 'btech_55', title: '55. Other Engineering specialization' }
                ]
              }
            ]
          },
          // F. BA — Bachelor of Arts (Section 12: 1 to 18)
          {
            id: 'ug_ba',
            title: 'BA — Bachelor of Arts',
            code: 'BA',
            branchesOrGroups: [
              {
                id: 'ba_specializations',
                title: 'BA Specialization Disciplines',
                yearsAllowed: ['1st Year', '2nd Year', '3rd Year'],
                semestersAllowed: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6'],
                specializations: [
                  { id: 'ba_1', title: '1. Economics' },
                  { id: 'ba_2', title: '2. History' },
                  { id: 'ba_3', title: '3. Political Science' },
                  { id: 'ba_4', title: '4. Psychology' },
                  { id: 'ba_5', title: '5. Sociology' },
                  { id: 'ba_6', title: '6. English' },
                  { id: 'ba_7', title: '7. Journalism and Mass Communication' },
                  { id: 'ba_8', title: '8. Public Administration' },
                  { id: 'ba_9', title: '9. Philosophy' },
                  { id: 'ba_10', title: '10. Geography' },
                  { id: 'ba_11', title: '11. International Relations' },
                  { id: 'ba_12', title: '12. Social Work' },
                  { id: 'ba_13', title: '13. Anthropology' },
                  { id: 'ba_14', title: '14. Linguistics' },
                  { id: 'ba_15', title: '15. Education' },
                  { id: 'ba_16', title: '16. Performing Arts' },
                  { id: 'ba_17', title: '17. Fine Arts' },
                  { id: 'ba_18', title: '18. Other BA specialization' }
                ]
              }
            ]
          },
          // G. Medical & Healthcare (All 31 Undergraduate Courses & Specializations)
          {
            id: 'ug_medical_healthcare',
            title: 'Medical & Healthcare',
            code: 'MED-UG',
            branchesOrGroups: [
              {
                id: 'ug_med_all_specializations',
                title: 'All Medical & Healthcare Specializations (1–31)',
                yearsAllowed: ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year / Internship'],
                semestersAllowed: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8', 'Annual Exams'],
                specializations: [
                  { id: 'ug_med_1', title: '1. MBBS', description: 'Bachelor of Medicine and Bachelor of Surgery — Human anatomy, clinical physiology, pathology, and general surgery.' },
                  { id: 'ug_med_2', title: '2. BDS (Dental Surgery)', description: 'Bachelor of Dental Surgery — Oral and maxillofacial pathology, orthodontics, and restorative dentistry.' },
                  { id: 'ug_med_3', title: '3. BAMS (Ayurveda)', description: 'Bachelor of Ayurvedic Medicine and Surgery — Dravyaguna, Panchakarma, and holistic herbal therapeutics.' },
                  { id: 'ug_med_4', title: '4. BHMS (Homeopathy)', description: 'Bachelor of Homeopathic Medicine and Surgery — Organon of medicine, repertory, and materia medica.' },
                  { id: 'ug_med_5', title: '5. B.Sc. Nursing', description: 'Comprehensive patient care, clinical nursing, pediatric health, and critical care management.' },
                  { id: 'ug_med_6', title: '6. GNM Nursing', description: 'General Nursing and Midwifery — Clinical bedside monitoring, maternal health, and community nursing.' },
                  { id: 'ug_med_7', title: '7. BPT (Bachelor of Physiotherapy)', description: 'Physical rehabilitation, musculoskeletal therapy, neuro-physiotherapy, and functional biomechanics.' },
                  { id: 'ug_med_8', title: '8. B.Pharm (Bachelor of Pharmacy)', description: 'Pharmaceutics, medicinal chemistry, clinical pharmacology, and pharmaceutical formulation.' },
                  { id: 'ug_med_9', title: '9. Pharm.D.', description: 'Doctor of Pharmacy — Clinical ward rounds, pharmacotherapy, adverse drug monitoring, and patient counseling.' },
                  { id: 'ug_med_10', title: '10. B.Sc. Medical Laboratory Technology (MLT)', description: 'Clinical biochemistry, hematology, microbiology diagnostics, blood banking, and histopathology.' },
                  { id: 'ug_med_11', title: '11. B.Sc. Medical Imaging Technology', description: 'Cross-sectional imaging, diagnostic ultrasound, MRI procedures, and computed tomography.' },
                  { id: 'ug_med_12', title: '12. B.Sc. Radiology & Imaging Technology', description: 'Diagnostic radiography, radiation physics, fluoroscopy, and radiation safety protocols.' },
                  { id: 'ug_med_13', title: '13. B.Sc. Anesthesia Technology', description: 'Anesthetic equipment preparation, patient hemodynamic monitoring, and acute airway support.' },
                  { id: 'ug_med_14', title: '14. B.Sc. Operation Theatre Technology', description: 'Surgical sterility protocols, surgical instrumentation, and intraoperative sterile field management.' },
                  { id: 'ug_med_15', title: '15. B.Sc. Optometry', description: 'Visual diagnostics, refraction, contact lens fitting, ocular motility, and vision correction aids.' },
                  { id: 'ug_med_16', title: '16. B.Sc. Cardiac Technology', description: 'Echocardiography, ECG telemetry, cardiac catheterization assistance, and cardiac stress testing.' },
                  { id: 'ug_med_17', title: '17. B.Sc. Dialysis Technology', description: 'Hemodialysis access care, dialyzer reprocessing, peritoneal dialysis, and renal replacement support.' },
                  { id: 'ug_med_18', title: '18. B.Sc. Respiratory Therapy', description: 'Mechanical ventilator setup, pulmonary function tests, aerosol therapy, and arterial blood gas analysis.' },
                  { id: 'ug_med_19', title: '19. B.Sc. Emergency Medical Technology', description: 'Pre-hospital trauma life support, advanced cardiac resuscitation, disaster triage, and ambulance operations.' },
                  { id: 'ug_med_20', title: '20. B.Sc. Allied Health Sciences', description: 'Interdisciplinary clinical health foundations, patient diagnostics, and healthcare system coordination.' },
                  { id: 'ug_med_21', title: '21. B.Sc. Biotechnology', description: 'Molecular biology, recombinant DNA technology, bioprocess engineering, and cellular therapeutics.' },
                  { id: 'ug_med_22', title: '22. B.Sc. Microbiology', description: 'Medical bacteriology, virology, immunology, diagnostic serology, and industrial fermentation.' },
                  { id: 'ug_med_23', title: '23. B.Sc. Biochemistry', description: 'Metabolic pathways, enzymology, clinical bio-analysis, and protein structure.' },
                  { id: 'ug_med_24', title: '24. B.Sc. Genetics', description: 'Human cytogenetics, chromosomal abnormalities, molecular genetics, and hereditary counseling.' },
                  { id: 'ug_med_25', title: '25. B.Sc. Forensic Science', description: 'Forensic toxicology, crime scene investigation, questioned documents, and forensic DNA profiling.' },
                  { id: 'ug_med_26', title: '26. B.Sc. Nutrition & Dietetics', description: 'Nutritional biochemistry, clinical diet therapy, lifecycle nutrition planning, and food service management.' },
                  { id: 'ug_med_27', title: '27. B.Sc. Food Science & Technology', description: 'Food processing, post-harvest preservation, HACCP hygiene, and nutritional quality assurance.' },
                  { id: 'ug_med_28', title: '28. B.Sc. Clinical Research', description: 'Good Clinical Practice (GCP), clinical trial protocols, bioethics, and drug safety data management.' },
                  { id: 'ug_med_29', title: '29. B.Sc. Public Health', description: 'Epidemiological surveillance, healthcare policy, community disease prevention, and biostatistics.' },
                  { id: 'ug_med_30', title: '30. B.Sc. Health Information Management', description: 'Electronic health records (EHR), ICD-10 medical coding, health informatics, and patient data privacy.' },
                  { id: 'ug_med_31', title: '31. Other Medical / Healthcare Degree', description: 'Custom undergraduate medical, nursing, allied health, or diagnostic degree specialization.' }
                ]
              },
              {
                id: 'ug_med_nutrition_cluster',
                title: 'Nutrition, Dietetics & Food Sciences Track',
                yearsAllowed: ['1st Year', '2nd Year', '3rd Year'],
                semestersAllowed: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6'],
                specializations: [
                  { id: 'ug_nutr_1', title: '26. B.Sc. Nutrition & Dietetics', description: 'Nutritional biochemistry, clinical diet therapy, lifecycle nutrition planning, and food service management.' },
                  { id: 'ug_nutr_2', title: '27. B.Sc. Food Science & Technology', description: 'Food processing, post-harvest preservation, HACCP hygiene, and nutritional quality assurance.' },
                  { id: 'ug_nutr_3', title: '20. B.Sc. Allied Health Sciences (Nutrition Focus)', description: 'Community nutrition, dietetics assessment, and preventative wellness counseling.' }
                ]
              }
            ]
          },

          // Law Courses under Undergraduate Degree
          // 1. LLB — Bachelor of Laws (3-year degree after graduation)
          {
            id: 'ug_llb',
            title: 'LLB — Bachelor of Laws (3-year degree after graduation)',
            code: 'LLB',
            category: 'Law & Legal Studies',
            branchesOrGroups: [
              {
                id: 'llb_core_branch',
                title: '3-Year LLB Legal Studies Track',
                category: 'Law & Advocacy',
                yearsAllowed: ['1st Year', '2nd Year', '3rd Year'],
                semestersAllowed: ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6'],
                specializations: [
                  { id: 'llb_spec_1', title: '1. General LLB & Civil Advocacy', description: 'Civil procedure, law of contracts, torts, property law, and courtroom trial advocacy.' },
                  { id: 'llb_spec_2', title: '2. Constitutional & Administrative Law', description: 'Fundamental rights, judicial review, constitutional remedies, and public administrative law.' },
                  { id: 'llb_spec_3', title: '3. Criminal Law & Criminology', description: 'Indian Penal Code (BNS), criminal procedure, forensic evidence, and trial practice.' },
                  { id: 'llb_spec_4', title: '4. Corporate, Commercial & Banking Law', description: 'Company law, mergers & acquisitions, banking regulations, and commercial contracts.' },
                  { id: 'llb_spec_5', title: '5. Cyber Law & Information Technology', description: 'Data privacy, IT Act regulations, digital evidence, and electronic contract enforcement.' },
                  { id: 'llb_spec_6', title: '6. Intellectual Property Rights (IPR)', description: 'Patents, trademarks, copyright law, design registration, and IP litigation.' },
                  { id: 'llb_spec_7', title: '7. Labor & Industrial Relations Law', description: 'Industrial dispute codes, labor welfare regulations, and collective bargaining law.' },
                  { id: 'llb_spec_8', title: '8. Taxation & Direct Tax Law', description: 'Income tax provisions, corporate taxation, GST jurisprudence, and revenue appeals.' },
                  { id: 'llb_spec_9', title: '9. Alternative Dispute Resolution (ADR)', description: 'Commercial arbitration, mediation, conciliation, and negotiated settlements.' },
                  { id: 'llb_spec_10', title: '10. Other / General Legal Studies', description: 'Custom legal research, litigation apprenticeship, or specialized law track.' }
                ]
              }
            ]
          },

          // 2. BA LLB — Bachelor of Arts + Bachelor of Laws (5-year integrated)
          {
            id: 'ug_ba_llb',
            title: 'BA LLB — Bachelor of Arts + Bachelor of Laws (5-year integrated)',
            code: 'BA-LLB',
            category: 'Law & Legal Studies',
            branchesOrGroups: [
              {
                id: 'ba_llb_integrated_branch',
                title: '5-Year Integrated Arts & Law Track',
                category: 'Interdisciplinary Law',
                yearsAllowed: ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year'],
                semestersAllowed: ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8', 'Semester 9', 'Semester 10'],
                specializations: [
                  { id: 'ba_llb_1', title: '1. Political Science & Constitutional Governance', description: 'Political theory, constitutional institutions, parliamentary procedures, and public policy.' },
                  { id: 'ba_llb_2', title: '2. Sociology, Criminal Justice & Human Rights', description: 'Sociology of law, penology, human rights advocacy, and juvenile justice.' },
                  { id: 'ba_llb_3', title: '3. History of Legal Systems & Jurisprudence', description: 'Comparative legal traditions, legal philosophy, constitutional history, and customary law.' },
                  { id: 'ba_llb_4', title: '4. Corporate & Commercial Law Practice', description: 'Corporate entity structuring, business transactions, securities, and competition law.' },
                  { id: 'ba_llb_5', title: '5. Cyber Law, Digital Rights & Media Law', description: 'Freedom of speech, cyber security regulations, telecom law, and media ethics.' },
                  { id: 'ba_llb_6', title: '6. International Law & Global Diplomacy', description: 'Public international law, international treaties, WTO frameworks, and consular law.' },
                  { id: 'ba_llb_7', title: '7. Public Interest Litigation & Legal Aid', description: 'Constitutional writ jurisdiction, legal clinic advocacy, and social justice lawyering.' },
                  { id: 'ba_llb_8', title: '8. Other / Integrated Arts & Law Specialization', description: 'Custom 5-year integrated arts and legal education curriculum.' }
                ]
              }
            ]
          },

          // 3. BBA LLB — Bachelor of Business Administration + Bachelor of Laws (5-year integrated)
          {
            id: 'ug_bba_llb',
            title: 'BBA LLB — Bachelor of Business Administration + Bachelor of Laws (5-year integrated)',
            code: 'BBA-LLB',
            category: 'Law & Legal Studies',
            branchesOrGroups: [
              {
                id: 'bba_llb_integrated_branch',
                title: '5-Year Integrated Business & Law Track',
                category: 'Corporate Law',
                yearsAllowed: ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year'],
                semestersAllowed: ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8', 'Semester 9', 'Semester 10'],
                specializations: [
                  { id: 'bba_llb_1', title: '1. Corporate Governance & M&A Law', description: 'Mergers, acquisitions, cross-border investments, corporate due diligence, and compliance.' },
                  { id: 'bba_llb_2', title: '2. Banking, FinTech & Securities Regulations', description: 'RBI guidelines, SEBI capital market compliance, FinTech lending laws, and digital banking.' },
                  { id: 'bba_llb_3', title: '3. International Trade, WTO & Investment Law', description: 'Cross-border commerce, international commercial dispute resolution, and export regulations.' },
                  { id: 'bba_llb_4', title: '4. Competition & Antitrust Law', description: 'Cartel enforcement, dominant position abuse regulation, and combination reviews.' },
                  { id: 'bba_llb_5', title: '5. Intellectual Property in Business & Patents', description: 'Commercializing IP assets, brand licensing, patent valuation, and trade secret protection.' },
                  { id: 'bba_llb_6', title: '6. Corporate Taxation & Insolvency (IBC)', description: 'Corporate restructuring under the Insolvency and Bankruptcy Code, direct tax, and GST.' },
                  { id: 'bba_llb_7', title: '7. Other / Integrated Business & Law Specialization', description: 'Custom 5-year integrated business management and corporate legal practice.' }
                ]
              }
            ]
          },

          // 4. BCom LLB — Bachelor of Commerce + Bachelor of Laws (5-year integrated)
          {
            id: 'ug_bcom_llb',
            title: 'BCom LLB — Bachelor of Commerce + Bachelor of Laws (5-year integrated)',
            code: 'BCom-LLB',
            category: 'Law & Legal Studies',
            branchesOrGroups: [
              {
                id: 'bcom_llb_integrated_branch',
                title: '5-Year Integrated Commerce & Law Track',
                category: 'Commercial Law',
                yearsAllowed: ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year'],
                semestersAllowed: ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8', 'Semester 9', 'Semester 10'],
                specializations: [
                  { id: 'bcom_llb_1', title: '1. Commercial Accounting & Insolvency Law', description: 'Financial reporting, audit standards, liquidation proceedings, and debt recovery.' },
                  { id: 'bcom_llb_2', title: '2. Corporate & Indirect Taxation (GST)', description: 'Goods and Services Tax tribunals, customs law, excise disputes, and revenue assessment.' },
                  { id: 'bcom_llb_3', title: '3. Capital Markets & SEBI Regulations', description: 'IPO underwriting compliance, insider trading laws, and securities market disclosures.' },
                  { id: 'bcom_llb_4', title: '4. Commercial Arbitration & Contract Enforcement', description: 'Drafting commercial contracts, breach remedies, and domestic arbitration procedures.' },
                  { id: 'bcom_llb_5', title: '5. Forensic Accounting & Corporate Fraud Law', description: 'Financial fraud detection, white-collar crime investigation, and regulatory compliance.' },
                  { id: 'bcom_llb_6', title: '6. Other / Integrated Commerce & Law Specialization', description: 'Custom 5-year integrated commerce, auditing, and corporate commercial law.' }
                ]
              }
            ]
          },

          // 5. BSc LLB — Bachelor of Science + Bachelor of Laws (where offered)
          {
            id: 'ug_bsc_llb',
            title: 'BSc LLB — Bachelor of Science + Bachelor of Laws (where offered)',
            code: 'BSc-LLB',
            category: 'Law & Legal Studies',
            branchesOrGroups: [
              {
                id: 'bsc_llb_integrated_branch',
                title: '5-Year Integrated Science & Law Track',
                category: 'Tech & Forensic Law',
                yearsAllowed: ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year'],
                semestersAllowed: ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8', 'Semester 9', 'Semester 10'],
                specializations: [
                  { id: 'bsc_llb_1', title: '1. Forensic Science & Criminalistics Law', description: 'Forensic toxicology, DNA profiling evidence, ballistics, and criminal trial admissibility.' },
                  { id: 'bsc_llb_2', title: '2. Cyber Forensics, Data Privacy & AI Ethics', description: 'Digital crime investigations, cloud data security laws, AI regulation, and cyber forensic evidence.' },
                  { id: 'bsc_llb_3', title: '3. Biotechnology, Pharma Patents & Life Sciences Law', description: 'Pharmaceutical patent litigation, biosafety regulations, drug approvals, and genetic research laws.' },
                  { id: 'bsc_llb_4', title: '4. Environmental Science & Climate Regulation Law', description: 'National Green Tribunal litigation, pollution control codes, and wildlife conservation statutes.' },
                  { id: 'bsc_llb_5', title: '5. Technology Transfer & Intellectual Property', description: 'Scientific patents, technology licensing agreements, and university research commercialization.' },
                  { id: 'bsc_llb_6', title: '6. Other / Integrated Science & Law Specialization', description: 'Custom 5-year integrated physical/biological sciences and legal studies track.' }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  // 5. POSTGRADUATE DEGREE (M.E./M.Tech, M.Sc, MA, MBA)
  {
    id: 'postgraduate',
    name: 'Postgraduate Degree',
    shortLabel: 'Postgraduate (PG)',
    description: 'Master degrees and research-driven advanced specializations in Technology, Science, Management, and Arts.',
    iconName: 'GraduationCap',
    qualifications: [
      {
        id: 'pg_degrees',
        title: 'Master Degrees (PG)',
        courses: [
          // A. M.E. / M.Tech. (Section 10: 1 to 50)
          {
            id: 'pg_mtech',
            title: 'M.E. / M.Tech. Specializations',
            code: 'M.Tech',
            branchesOrGroups: [
              {
                id: 'mtech_cs_it',
                title: 'Computer Science and IT',
                yearsAllowed: ['1st Year', '2nd Year'],
                semestersAllowed: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
                specializations: [
                  { id: 'mtech_1', title: '1. Computer Science and Engineering' },
                  { id: 'mtech_2', title: '2. Artificial Intelligence' },
                  { id: 'mtech_3', title: '3. Machine Learning' },
                  { id: 'mtech_4', title: '4. Data Science' },
                  { id: 'mtech_5', title: '5. Cybersecurity' },
                  { id: 'mtech_6', title: '6. Information Security' },
                  { id: 'mtech_7', title: '7. Software Engineering' },
                  { id: 'mtech_8', title: '8. Cloud Computing' },
                  { id: 'mtech_9', title: '9. Computer Networks' },
                  { id: 'mtech_10', title: '10. Internet of Things' },
                  { id: 'mtech_11', title: '11. Blockchain Technology' },
                  { id: 'mtech_12', title: '12. Computer Vision' },
                  { id: 'mtech_13', title: '13. Natural Language Processing' },
                  { id: 'mtech_14', title: '14. Big Data Analytics' },
                  { id: 'mtech_15', title: '15. Human-Computer Interaction' },
                  { id: 'mtech_16', title: '16. Other CSE specialization' }
                ]
              },
              {
                id: 'mtech_ece_eee',
                title: 'Electronics and Electrical',
                yearsAllowed: ['1st Year', '2nd Year'],
                semestersAllowed: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
                specializations: [
                  { id: 'mtech_17', title: '17. VLSI Design' },
                  { id: 'mtech_18', title: '18. Embedded Systems' },
                  { id: 'mtech_19', title: '19. Microelectronics' },
                  { id: 'mtech_20', title: '20. Signal Processing' },
                  { id: 'mtech_21', title: '21. Communication Systems' },
                  { id: 'mtech_22', title: '22. Wireless Communication' },
                  { id: 'mtech_23', title: '23. Power Systems' },
                  { id: 'mtech_24', title: '24. Power Electronics' },
                  { id: 'mtech_25', title: '25. Control Systems' },
                  { id: 'mtech_26', title: '26. Electrical Drives' },
                  { id: 'mtech_27', title: '27. Instrumentation' },
                  { id: 'mtech_28', title: '28. Robotics' },
                  { id: 'mtech_29', title: '29. Automation' },
                  { id: 'mtech_30', title: '30. Other Electronics / Electrical specialization' }
                ]
              },
              {
                id: 'mtech_core_engg',
                title: 'Core Engineering',
                yearsAllowed: ['1st Year', '2nd Year'],
                semestersAllowed: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
                specializations: [
                  { id: 'mtech_31', title: '31. Structural Engineering' },
                  { id: 'mtech_32', title: '32. Geotechnical Engineering' },
                  { id: 'mtech_33', title: '33. Transportation Engineering' },
                  { id: 'mtech_34', title: '34. Environmental Engineering' },
                  { id: 'mtech_35', title: '35. Construction Management' },
                  { id: 'mtech_36', title: '36. Thermal Engineering' },
                  { id: 'mtech_37', title: '37. Machine Design' },
                  { id: 'mtech_38', title: '38. Manufacturing Engineering' },
                  { id: 'mtech_39', title: '39. CAD/CAM' },
                  { id: 'mtech_40', title: '40. Industrial Engineering' },
                  { id: 'mtech_41', title: '41. Production Engineering' },
                  { id: 'mtech_42', title: '42. Mechatronics' },
                  { id: 'mtech_43', title: '43. Aerospace Engineering' },
                  { id: 'mtech_44', title: '44. Automobile Engineering' },
                  { id: 'mtech_45', title: '45. Chemical Engineering' },
                  { id: 'mtech_46', title: '46. Biotechnology' },
                  { id: 'mtech_47', title: '47. Biomedical Engineering' },
                  { id: 'mtech_48', title: '48. Materials Science' },
                  { id: 'mtech_49', title: '49. Energy Systems' },
                  { id: 'mtech_50', title: '50. Other Engineering specialization' }
                ]
              }
            ]
          },
          // B. M.Sc. Specializations (Section 11: 1 to 30)
          {
            id: 'pg_msc',
            title: 'M.Sc. — Master of Science Specializations',
            code: 'M.Sc',
            branchesOrGroups: [
              {
                id: 'msc_all_disciplines',
                title: 'M.Sc Postgraduate Disciplines',
                yearsAllowed: ['1st Year', '2nd Year'],
                semestersAllowed: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
                specializations: [
                  { id: 'msc_1', title: '1. M.Sc. Mathematics' },
                  { id: 'msc_2', title: '2. M.Sc. Applied Mathematics' },
                  { id: 'msc_3', title: '3. M.Sc. Statistics' },
                  { id: 'msc_4', title: '4. M.Sc. Data Science' },
                  { id: 'msc_5', title: '5. M.Sc. Artificial Intelligence' },
                  { id: 'msc_6', title: '6. M.Sc. Machine Learning' },
                  { id: 'msc_7', title: '7. M.Sc. Computer Science' },
                  { id: 'msc_8', title: '8. M.Sc. Information Technology' },
                  { id: 'msc_9', title: '9. M.Sc. Cybersecurity' },
                  { id: 'msc_10', title: '10. M.Sc. Physics' },
                  { id: 'msc_11', title: '11. M.Sc. Chemistry' },
                  { id: 'msc_12', title: '12. M.Sc. Analytical Chemistry' },
                  { id: 'msc_13', title: '13. M.Sc. Organic Chemistry' },
                  { id: 'msc_14', title: '14. M.Sc. Physical Chemistry' },
                  { id: 'msc_biology', title: 'M.Sc. Biology' },
                  { id: 'msc_15', title: '15. M.Sc. Botany' },
                  { id: 'msc_16', title: '16. M.Sc. Zoology' },
                  { id: 'msc_17', title: '17. M.Sc. Microbiology' },
                  { id: 'msc_18', title: '18. M.Sc. Biotechnology' },
                  { id: 'msc_19', title: '19. M.Sc. Biochemistry' },
                  { id: 'msc_20', title: '20. M.Sc. Genetics' },
                  { id: 'msc_bioinformatics', title: 'M.Sc. Bioinformatics' },
                  { id: 'msc_21', title: '21. M.Sc. Environmental Science' },
                  { id: 'msc_22', title: '22. M.Sc. Forensic Science' },
                  { id: 'msc_23', title: '23. M.Sc. Agriculture' },
                  { id: 'msc_24', title: '24. M.Sc. Horticulture' },
                  { id: 'msc_25', title: '25. M.Sc. Food Science' },
                  { id: 'msc_food_nutrition', title: 'M.Sc. Food & Nutrition' },
                  { id: 'msc_26', title: '26. M.Sc. Nutrition and Dietetics' },
                  { id: 'msc_clinical_nutrition', title: 'M.Sc. Clinical Nutrition' },
                  { id: 'msc_27', title: '27. M.Sc. Medical Laboratory Technology' },
                  { id: 'msc_28', title: '28. M.Sc. Medical Imaging Technology' },
                  { id: 'msc_29', title: '29. M.Sc. Clinical Research' },
                  { id: 'msc_nursing', title: 'M.Sc. Nursing' },
                  { id: 'msc_30', title: '30. Other M.Sc. specialization' }
                ]
              },
              {
                id: 'msc_biological_sciences',
                title: 'Biological & Life Sciences Disciplines',
                yearsAllowed: ['1st Year', '2nd Year'],
                semestersAllowed: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
                specializations: [
                  { id: 'pg_bio_1', title: 'M.Sc. Biology', description: 'Advanced molecular cell biology, evolutionary genetics, functional proteomics, and systems biology.' },
                  { id: 'pg_bio_2', title: 'M.Sc. Botany', description: 'Advanced plant biotechnology, phytochemistry, plant metabolomics, and developmental genetics.' },
                  { id: 'pg_bio_3', title: 'M.Sc. Zoology', description: 'Advanced animal neurobiology, physiology, molecular endocrinology, and immunology.' },
                  { id: 'pg_bio_4', title: 'M.Sc. Biotechnology', description: 'Genetic engineering, mammalian biomanufacturing, recombinant therapeutics, and CRISPR genomics.' },
                  { id: 'pg_bio_5', title: 'M.Sc. Microbiology', description: 'Molecular virology, clinical bacteriology, microbial genomics, and antimicrobial resistance.' },
                  { id: 'pg_bio_6', title: 'M.Sc. Biochemistry', description: 'Enzyme mechanisms, structural proteomics, signal transduction pathways, and metabolic regulation.' },
                  { id: 'pg_bio_7', title: 'M.Sc. Genetics', description: 'Clinical cytogenetics, next-generation sequencing analysis, human genomics, and genetic counseling.' },
                  { id: 'pg_bio_8', title: 'M.Sc. Bioinformatics', description: 'Computational biology, structural bioinformatics, molecular docking, and genomic data science.' },
                  { id: 'pg_bio_9', title: 'M.Sc. Forensic Science', description: 'Forensic DNA profiling, forensic mass spectrometry, legal toxicology, and cyber forensics.' },
                  { id: 'pg_bio_10', title: 'M.Sc. Nutrition & Dietetics', description: 'Advanced clinical nutrition, metabolic dietetics, parenteral therapy, and lifecycle nutrition.' },
                  { id: 'pg_bio_11', title: 'M.Sc. Clinical Nutrition', description: 'Specialized clinical hospital nutrition, critical care enteral therapy, and oncology nutrition.' },
                  { id: 'pg_bio_12', title: 'M.Sc. Food & Nutrition', description: 'Food chemistry, advanced nutrient bioavailability, therapeutic meal planning, and nutraceuticals.' },
                  { id: 'pg_bio_13', title: 'M.Sc. Medical Laboratory Technology', description: 'Advanced clinical chemistry, automated hematology, diagnostic serology, and lab accreditation.' },
                  { id: 'pg_bio_14', title: 'M.Sc. Nursing', description: 'Advanced clinical nursing practice, critical care patient management, and healthcare leadership.' },
                  { id: 'pg_bio_15', title: 'Other M.Sc. Life Sciences Specialization', description: 'Custom postgraduate biological, agricultural, marine, or biomedical research specialization.' }
                ]
              }
            ]
          },
          // C. M.Com. — Master of Commerce
          {
            id: 'pg_mcom',
            title: 'M.Com. — Master of Commerce',
            code: 'M.Com',
            branchesOrGroups: [
              {
                id: 'mcom_all_specializations',
                title: 'M.Com Specialization Streams',
                yearsAllowed: ['1st Year', '2nd Year'],
                semestersAllowed: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
                specializations: [
                  { id: 'mcom_1', title: '1. M.Com. General' },
                  { id: 'mcom_2', title: '2. M.Com. Accounting and Finance' },
                  { id: 'mcom_3', title: '3. M.Com. Banking and Insurance' },
                  { id: 'mcom_4', title: '4. M.Com. Taxation and Auditing' },
                  { id: 'mcom_5', title: '5. M.Com. Financial Analysis and FinTech' },
                  { id: 'mcom_6', title: '6. M.Com. International Business' },
                  { id: 'mcom_7', title: '7. M.Com. Business Analytics' },
                  { id: 'mcom_8', title: '8. Other M.Com. specialization' }
                ]
              }
            ]
          },
          // D. MCA — Master of Computer Applications
          {
            id: 'pg_mca',
            title: 'MCA — Master of Computer Applications',
            code: 'MCA',
            branchesOrGroups: [
              {
                id: 'mca_all_specializations',
                title: 'MCA Specialization Streams',
                yearsAllowed: ['1st Year', '2nd Year'],
                semestersAllowed: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
                specializations: [
                  { id: 'mca_1', title: '1. MCA General' },
                  { id: 'mca_2', title: '2. MCA Software Engineering & Development' },
                  { id: 'mca_3', title: '3. MCA Artificial Intelligence and Machine Learning' },
                  { id: 'mca_4', title: '4. MCA Data Science and Big Data Analytics' },
                  { id: 'mca_5', title: '5. MCA Cloud Computing and DevOps' },
                  { id: 'mca_6', title: '6. MCA Cybersecurity and Information Defense' },
                  { id: 'mca_7', title: '7. MCA Web and Full-Stack Development' },
                  { id: 'mca_8', title: '8. MCA Mobile Application Development' },
                  { id: 'mca_9', title: '9. Other MCA specialization' }
                ]
              }
            ]
          },
          // C. MA — Master of Arts (Section 12: 1 to 16)
          {
            id: 'pg_ma',
            title: 'MA — Master of Arts Specializations',
            code: 'MA',
            branchesOrGroups: [
              {
                id: 'ma_all_disciplines',
                title: 'MA Postgraduate Disciplines',
                yearsAllowed: ['1st Year', '2nd Year'],
                semestersAllowed: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
                specializations: [
                  { id: 'ma_1', title: '1. Economics' },
                  { id: 'ma_2', title: '2. History' },
                  { id: 'ma_3', title: '3. Political Science' },
                  { id: 'ma_4', title: '4. Psychology' },
                  { id: 'ma_5', title: '5. Sociology' },
                  { id: 'ma_6', title: '6. English' },
                  { id: 'ma_7', title: '7. Journalism and Mass Communication' },
                  { id: 'ma_8', title: '8. Public Administration' },
                  { id: 'ma_9', title: '9. Philosophy' },
                  { id: 'ma_10', title: '10. Geography' },
                  { id: 'ma_11', title: '11. International Relations' },
                  { id: 'ma_12', title: '12. Social Work' },
                  { id: 'ma_13', title: '13. Anthropology' },
                  { id: 'ma_14', title: '14. Linguistics' },
                  { id: 'ma_15', title: '15. Education' },
                  { id: 'ma_16', title: '16. Other MA specialization' }
                ]
              }
            ]
          },
          // D. MBA Specializations (Section 13: 1 to 26)
          {
            id: 'pg_mba',
            title: 'MBA — Master of Business Administration',
            code: 'MBA',
            branchesOrGroups: [
              {
                id: 'mba_all_specializations',
                title: 'MBA Specialization Streams',
                yearsAllowed: ['1st Year', '2nd Year'],
                semestersAllowed: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
                specializations: [
                  { id: 'mba_1', title: '1. MBA General' },
                  { id: 'mba_2', title: '2. MBA Finance' },
                  { id: 'mba_3', title: '3. MBA Marketing' },
                  { id: 'mba_4', title: '4. MBA Human Resource Management' },
                  { id: 'mba_5', title: '5. MBA Business Analytics' },
                  { id: 'mba_6', title: '6. MBA Data Analytics' },
                  { id: 'mba_7', title: '7. MBA International Business' },
                  { id: 'mba_8', title: '8. MBA Operations Management' },
                  { id: 'mba_9', title: '9. MBA Supply Chain Management' },
                  { id: 'mba_10', title: '10. MBA Logistics' },
                  { id: 'mba_11', title: '11. MBA Retail Management' },
                  { id: 'mba_12', title: '12. MBA Entrepreneurship' },
                  { id: 'mba_13', title: '13. MBA Information Technology' },
                  { id: 'mba_14', title: '14. MBA Systems Management' },
                  { id: 'mba_15', title: '15. MBA Digital Marketing' },
                  { id: 'mba_16', title: '16. MBA Banking and Insurance' },
                  { id: 'mba_17', title: '17. MBA Healthcare Management' },
                  { id: 'mba_18', title: '18. MBA Hospital Administration' },
                  { id: 'mba_19', title: '19. MBA Tourism and Hospitality Management' },
                  { id: 'mba_20', title: '20. MBA Project Management' },
                  { id: 'mba_21', title: '21. MBA Business Intelligence' },
                  { id: 'mba_22', title: '22. MBA Artificial Intelligence and Business' },
                  { id: 'mba_23', title: '23. MBA FinTech' },
                  { id: 'mba_24', title: '24. MBA Rural Management' },
                  { id: 'mba_25', title: '25. MBA Agribusiness Management' },
                  { id: 'mba_26', title: '26. Other MBA specialization' }
                ]
              }
            ]
          },
          // E. Medical & Healthcare (All 29 Postgraduate Courses & Specializations)
          {
            id: 'pg_medical_healthcare',
            title: 'Medical & Healthcare',
            code: 'MED-PG',
            branchesOrGroups: [
              {
                id: 'pg_med_all_specializations',
                title: 'All Medical & Healthcare Specializations (1–29)',
                yearsAllowed: ['1st Year', '2nd Year', '3rd Year / Resident'],
                semestersAllowed: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Annual Exams'],
                specializations: [
                  { id: 'pg_med_1', title: '1. M.Sc. Nutrition & Dietetics', description: 'Advanced therapeutic dietetics, metabolic nutrition therapy, and clinical nutrition interventions.' },
                  { id: 'pg_med_2', title: '2. M.Sc. Clinical Nutrition', description: 'Specialized hospital clinical nutrition, enteral and parenteral support, and critical care dietetics.' },
                  { id: 'pg_med_3', title: '3. M.Sc. Food & Nutrition', description: 'Advanced food biochemistry, nutrient metabolism, functional foods, and dietary program planning.' },
                  { id: 'pg_med_4', title: '4. M.Sc. Public Health Nutrition', description: 'Community nutrition epidemiology, malnutrition prevention programs, and global nutrition policy.' },
                  { id: 'pg_med_5', title: '5. M.Sc. Sports Nutrition', description: 'Sports metabolic conditioning, athlete performance diet planning, hydration science, and ergogenic aids.' },
                  { id: 'pg_med_6', title: '6. M.Sc. Human Nutrition', description: 'Nutrigenomics, molecular human nutrient assimilation, life-cycle nutrition, and metabolic homeostasis.' },
                  { id: 'pg_med_7', title: '7. M.Sc. Food Science & Technology', description: 'Food processing innovation, thermal/non-thermal preservation, food packaging, and ISO/HACCP audits.' },
                  { id: 'pg_med_8', title: '8. M.Sc. Medical Laboratory Technology (MLT)', description: 'Advanced molecular diagnostics, automated hematology, clinical microbiology, and lab accreditation.' },
                  { id: 'pg_med_9', title: '9. M.Sc. Medical Imaging Technology', description: 'High-field MRI pulse sequences, multidetector CT protocols, image reconstruction, and diagnostic PACS.' },
                  { id: 'pg_med_10', title: '10. M.Sc. Radiology & Imaging', description: 'Radiation dosimetry, interventional radiography, radiopharmaceutical imaging, and radiation safety.' },
                  { id: 'pg_med_11', title: '11. M.Sc. Anesthesia Technology', description: 'Complex anesthetic pharmacology delivery, invasive hemodynamic monitoring, and acute airway rescue.' },
                  { id: 'pg_med_12', title: '12. M.Sc. Operation Theatre Technology', description: 'Management of advanced surgical suites, sterile supply processing (CSSD), and robotic surgical logistics.' },
                  { id: 'pg_med_13', title: '13. M.Sc. Cardiac Technology', description: 'Invasive coronary angiography assistance, electrophysiology mapping, and transesophageal echocardiography.' },
                  { id: 'pg_med_14', title: '14. M.Sc. Dialysis Technology', description: 'Advanced hemodiafiltration, continuous renal replacement therapy (CRRT), and vascular access surveillance.' },
                  { id: 'pg_med_15', title: '15. M.Sc. Respiratory Therapy', description: 'Advanced critical care mechanical ventilation, extracorporeal membrane oxygenation (ECMO) basics, and pulmonary rehab.' },
                  { id: 'pg_med_16', title: '16. M.Sc. Biotechnology', description: 'Recombinant therapeutics, mammalian cell bioprocessing, CRISPR-Cas9 genome editing, and bioinformatics.' },
                  { id: 'pg_med_17', title: '17. M.Sc. Microbiology', description: 'Molecular virology, bacterial pathogenesis, antimicrobial resistance surveillance, and diagnostic immunology.' },
                  { id: 'pg_med_18', title: '18. M.Sc. Biochemistry', description: 'Enzyme kinetics, signal transduction cascades, clinical proteomics, and metabolic regulation.' },
                  { id: 'pg_med_19', title: '19. M.Sc. Genetics', description: 'Next-generation sequencing (NGS), human clinical cytogenetics, rare disease genomics, and genetic counseling.' },
                  { id: 'pg_med_20', title: '20. M.Sc. Forensic Science', description: 'Forensic DNA phenotyping, forensic mass spectrometry, cyber forensics, and medico-legal jurisprudence.' },
                  { id: 'pg_med_21', title: '21. M.Sc. Clinical Research', description: 'Clinical trial protocols design, biostatistics, FDA/ICH GCP regulations, and pharmacovigilance safety.' },
                  { id: 'pg_med_22', title: '22. MPH (Master of Public Health)', description: 'Epidemiological methods, public health leadership, biostatistics, health systems, and infectious disease control.' },
                  { id: 'pg_med_23', title: '23. MPT (Master of Physiotherapy)', description: 'Advanced clinical physiotherapy in Orthopedics, Neurology, Cardiopulmonary, or Sports Rehabilitation.' },
                  { id: 'pg_med_24', title: '24. M.Pharm — Pharmacy specializations', description: 'Advanced Pharmaceutics, Pharmacology, Pharmaceutical Chemistry, Regulatory Affairs, and Clinical Pharmacy.' },
                  { id: 'pg_med_25', title: '25. M.Sc. Nursing — Nursing specializations', description: 'Advanced Nursing Practice in Medical-Surgical, Community Health, Obstetrics, Pediatrics, or Mental Health.' },
                  { id: 'pg_med_26', title: '26. Master of Hospital Administration (MHA)', description: 'Hospital operational management, quality accreditation (NABH/JCI), healthcare finance, and clinical ergonomics.' },
                  { id: 'pg_med_27', title: '27. Master of Healthcare Management', description: 'Strategic healthcare organization, health policy, health insurance reimbursement, and healthcare analytics.' },
                  { id: 'pg_med_28', title: '28. Master of Health Informatics', description: 'Clinical decision support systems, EHR interoperability (HL7/FHIR), telehealth, and AI clinical diagnostics.' },
                  { id: 'pg_med_29', title: '29. Other Medical / Healthcare PG Specialization', description: 'Custom postgraduate clinical, allied health, pharmaceutical, or nutritional research track.' }
                ]
              },
              {
                id: 'pg_med_nutrition_cluster',
                title: 'Nutrition & Dietetics Postgraduate Specializations',
                yearsAllowed: ['1st Year', '2nd Year'],
                semestersAllowed: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
                specializations: [
                  { id: 'pg_nutr_1', title: '1. M.Sc. Nutrition & Dietetics', description: 'Advanced therapeutic dietetics, metabolic nutrition therapy, and clinical nutrition interventions.' },
                  { id: 'pg_nutr_2', title: '2. M.Sc. Clinical Nutrition', description: 'Specialized hospital clinical nutrition, enteral and parenteral support, and critical care dietetics.' },
                  { id: 'pg_nutr_3', title: '3. M.Sc. Food & Nutrition', description: 'Advanced food biochemistry, nutrient metabolism, functional foods, and dietary program planning.' },
                  { id: 'pg_nutr_4', title: '4. M.Sc. Public Health Nutrition', description: 'Community nutrition epidemiology, malnutrition prevention programs, and global nutrition policy.' },
                  { id: 'pg_nutr_5', title: '5. M.Sc. Sports Nutrition', description: 'Sports metabolic conditioning, athlete performance diet planning, hydration science, and ergogenic aids.' },
                  { id: 'pg_nutr_6', title: '6. M.Sc. Human Nutrition', description: 'Nutrigenomics, molecular human nutrient assimilation, life-cycle nutrition, and metabolic homeostasis.' },
                  { id: 'pg_nutr_7', title: '7. M.Sc. Food Science & Technology', description: 'Food processing innovation, thermal/non-thermal preservation, food packaging, and ISO/HACCP audits.' }
                ]
              }
            ]
          },

          // Law Course under Postgraduate Degree
          // LLM — Master of Laws
          {
            id: 'pg_llm',
            title: 'LLM — Master of Laws',
            code: 'LLM',
            category: 'Law & Legal Studies',
            branchesOrGroups: [
              {
                id: 'llm_specialization_branch',
                title: 'LLM Postgraduate Specialization Tracks',
                category: 'Master of Laws',
                yearsAllowed: ['1st Year', '2nd Year'],
                semestersAllowed: ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4'],
                specializations: [
                  { id: 'llm_spec_1', title: '1. Constitutional & Administrative Law', description: 'Comparative constitutionalism, federalism, judicial statecraft, and administrative discretion.' },
                  { id: 'llm_spec_2', title: '2. Corporate & Commercial Law', description: 'Advanced corporate finance, transnational corporate governance, and securities enforcement.' },
                  { id: 'llm_spec_3', title: '3. Criminal Law & Criminal Justice Administration', description: 'Advanced penal jurisprudence, victimology, international criminal court, and procedural reforms.' },
                  { id: 'llm_spec_4', title: '4. Cyber Law & Information Security', description: 'Cross-border data privacy regimes, dark web cybercrime prosecution, and emerging AI legal frameworks.' },
                  { id: 'llm_spec_5', title: '5. Intellectual Property Rights (IPR)', description: 'TRIPS compliance, global patent prosecution, trademark conflicts, and digital copyright jurisprudence.' },
                  { id: 'llm_spec_6', title: '6. International Trade & Business Law', description: 'WTO dispute settlement, multilateral investment treaties, and international sales contracts.' },
                  { id: 'llm_spec_7', title: '7. Human Rights & Humanitarian Law', description: 'Universal human rights conventions, refugee protection, and humanitarian conflict jurisprudence.' },
                  { id: 'llm_spec_8', title: '8. Alternative Dispute Resolution (ADR) & Arbitration', description: 'International commercial arbitration (UNCITRAL), investor-state mediation, and arbitral award enforcement.' },
                  { id: 'llm_spec_9', title: '9. Taxation & Financial Regulation Law', description: 'International tax treaties (DTAA), transfer pricing regulations, and anti-money laundering frameworks.' },
                  { id: 'llm_spec_10', title: '10. Environmental & Energy Law', description: 'Climate change international treaties, carbon credit trading laws, and sustainable resource regulation.' },
                  { id: 'llm_spec_11', title: '11. Other / General Master of Laws (LLM)', description: 'Custom postgraduate legal research, academic dissertation, or specialized judicial study.' }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  // 6. PROFESSIONAL COURSES (Section 14: 1 to 26)
  {
    id: 'professional',
    name: 'Professional Courses',
    shortLabel: 'Professional',
    description: 'Statutory, legal, medical, architecture, design, and executive chartered professions.',
    iconName: 'Briefcase',
    qualifications: [
      {
        id: 'prof_courses_all',
        title: 'Professional Licensing & Degree Programs',
        courses: [
          {
            id: 'prof_group_registry',
            title: 'Professional Disciplines & Licensures',
            branchesOrGroups: [
              {
                id: 'prof_all_tracks',
                title: 'Professional Certification & Degree Tracks',
                yearsAllowed: ['Foundation / Level 1', 'Intermediate / Level 2', 'Final / Level 3', 'Internship / Article'],
                specializations: [
                  { id: 'prof_1', title: '1. CA — Chartered Accountancy' },
                  { id: 'prof_2', title: '2. CMA — Cost and Management Accountancy' },
                  { id: 'prof_3', title: '3. CS — Company Secretary' },
                  { id: 'prof_4', title: '4. ACCA' },
                  { id: 'prof_5', title: '5. CFA' },
                  { id: 'prof_6', title: '6. LLB — Bachelor of Laws' },
                  { id: 'prof_7', title: '7. LLM — Master of Laws' },
                  { id: 'prof_8', title: '8. B.Pharm — Bachelor of Pharmacy' },
                  { id: 'prof_9', title: '9. M.Pharm — Master of Pharmacy' },
                  { id: 'prof_10', title: '10. Pharm.D.' },
                  { id: 'prof_11', title: '11. MBBS' },
                  { id: 'prof_12', title: '12. BDS' },
                  { id: 'prof_13', title: '13. BAMS' },
                  { id: 'prof_14', title: '14. BHMS' },
                  { id: 'prof_15', title: '15. BPT — Physiotherapy' },
                  { id: 'prof_16', title: '16. B.Sc. Nursing' },
                  { id: 'prof_17', title: '17. GNM Nursing' },
                  { id: 'prof_18', title: '18. B.Arch. — Architecture' },
                  { id: 'prof_19', title: '19. M.Arch.' },
                  { id: 'prof_20', title: '20. B.Des. — Bachelor of Design' },
                  { id: 'prof_21', title: '21. M.Des. — Master of Design' },
                  { id: 'prof_22', title: '22. Bachelor of Hotel Management' },
                  { id: 'prof_23', title: '23. Bachelor of Tourism Management' },
                  { id: 'prof_24', title: '24. BSW — Bachelor of Social Work' },
                  { id: 'prof_25', title: '25. MSW — Master of Social Work' },
                  { id: 'prof_26', title: '26. Other Professional Course' }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  // 7. OTHER / NOT LISTED
  {
    id: 'other',
    name: 'Other / Not Listed',
    shortLabel: 'Other / Custom',
    description: 'Vocational diplomas, international qualifications, self-taught tech pathways, and career changers.',
    iconName: 'Compass',
    qualifications: [
      {
        id: 'other_qual',
        title: 'Alternative & Interdisciplinary Programs',
        courses: [
          {
            id: 'custom_path_courses',
            title: 'Custom Learning Tracks',
            branchesOrGroups: [
              {
                id: 'custom_path_group',
                title: 'Self-Paced / Industry Certification Group',
                yearsAllowed: ['Independent Learner', 'Professional Transition'],
                specializations: [
                  { id: 'other_1', title: 'Full-Stack Software Engineering & Open Source' },
                  { id: 'other_2', title: 'Applied Generative AI & Machine Learning' },
                  { id: 'other_3', title: 'Digital Business & Product Management' },
                  { id: 'other_4', title: 'UI/UX Design & Human-Centered Computing' },
                  { id: 'other_5', title: 'Cloud Infrastructure & DevOps' },
                  { id: 'other_6', title: 'Autonomous Custom Stream / Independent Research' }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

export const ALL_BOARDS = [
  'Telangana Intermediate (TSBIE)',
  'CBSE (Central Board of Secondary Education)',
  'CISCE (ICSE / ISC)',
  'State Board of Technical Education (SBTET)',
  'Andhra Pradesh Board (BIEAP)',
  'State Secondary Education Board',
  'Autonomous Deemed University',
  'State University',
  'Central University',
  'International Baccalaureate (IB) / Cambridge (CIE)',
  'Professional Regulatory Body (ICAI / ICSI / BCI / NMC / PCI)',
  'Other / Custom Board'
];

export const BSC_STUDY_TYPES = [
  'B.Sc. General / Pass',
  'B.Sc. Honours',
  'B.Sc. Honours with Research',
  'Other / Not Listed'
] as const;
