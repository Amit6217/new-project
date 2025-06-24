// Department data
const departments = {
    ic: {
        name: 'Institute Core',
        icon: 'fa-laptop-code',
        subjects: {
            1: [
                { name: 'Engineering Chemistry ', code: '22CYT101 ' },
                { name: 'Mathematics I ', code: '22MAT101' },
                { name: 'Basics of Electrical Eng.', code: '22EET107' },
                { name: 'Basics of Electronics Eng', code: '22ECT102' },
                { name: 'Programming with Python ', code: '22CST101' },
                { name: 'Environmental Science ', code: '22CET102' },
            ],
            2: [
                { name: 'Mathematics II ', code: '22MAT102' },
                { name: 'Modern Physics', code: '22PHT102' },
                { name: 'Engineering Drawing and Sketching', code: '22CET112' },
                { name: 'Introduction to Mechanical Systems', code: '22MET101' },
                { name: 'Basic Economics', code: '22HST101' },
                { name: 'English Communication Skills ', code: '22HST106' }
            ],
        }
    },
    cse: {
        name: 'Computer Science and Engineering',
        icon: 'fa-laptop-code',
        subjects: {
            1: [
                { name: 'Problem Solving using C', code: '22CPT103 ' },
                { name: 'Discrete Mathematics', code: '22CPT104' },
            ],
            2: [
                { name: 'Data Structures', code: 'CS201' },
                { name: 'Logic System Design', code: 'CS202' },
            ],
            3: [
                { name: 'Data Communications', code: '22CPT201' },
                { name: 'Design and Analysis of Algorithms', code: '22CPT202' },
                { name: 'Digital Circuits and Microprocessors', code: '22CPT203' },
                { name: 'Foundation of Learning', code: '22CPT204' },
                { name: 'Object Oriented Analysis and Design', code: '22CPT205' },
                { name: 'Technical Writing', code: '22CPT206' },
                { name: 'Social Sciences and Professional Ethics', code: '22HST241' },
            ],
            4: [
                { name: 'Computer Networks', code: '22CPT211' },
                { name: 'Computer Organization and Architecture', code: '22CPT212' },
                { name: 'Theory of Computation', code: '22CPT215' },
                { name: 'Database Information Systems', code: '22CPT213' },
                { name: 'Machine Learning', code: '22CPT214' },
                { name: 'Basics of Managements', code: '22BMT201' },
            ],

            5: [
                { name: 'Compiler Design', code: '22CPT301' },
                { name: 'Cryptography', code: '22CPT302' },
                { name: 'Operating System', code: '22CPT303' },
                { name: 'Software Engineering', code: '22CPT304' },
                { name: 'Emerging Technologies for CS', code: '22CPT305' },
            ],

            6: [
                { name: 'Artificial Intelligence', code: '22CPT309' },
                { name: 'Computer and Network Security', code: '22CPT310' },
                { name: 'Digital Image Processing', code: '22CPT311' },
                { name: 'Parallel and Distributed Computing', code: '22CPT312' },
                { name: 'Smart Grid', code: '22EET313' },
            ],
        }
    },
    ece: {
        name: 'Electronics and Communication Engineering',
        icon: 'fa-microchip',
        subjects: {
            1: [
                { name: 'Electronic Measurement and Instrumentation', code: '22EC101' },
                { name: 'Circuits and Networks', code: '22EC102' },
            ],
            2: [
                { name: 'Electronic Devices and Circuits', code: '22EC103' },
                { name: 'Signals & Systems', code: '22ECT104' },
            ],
            3: [
                { code: "22ECT201", name: "Analog Communication" },
                { code: "22ECT202", name: "Data Structures & Algorithms" },
                { code: "22ECT203", name: "Digital Logic Design" },
                { code: "22ECT204", name: "Electro-magnetic Field Theory" },
                { code: "22ECT205", name: "Linear Integrated Circuits" },
                { code: "22ECT206", name: "Operating System Concepts" }
            ],
            4: [
                { code: "22ECT212", name: "Analog CMOS IC" },
                { code: "22ECT213", name: "Computer Architecture" },
                { code: "22ECT214", name: "Digital Communication Systems" },
                { code: "22ECT215", name: "Digital Signal Processing" },
                { code: "22ECT216", name: "Microwave Engineering" },
                { code: "22ECT217", name: "Technical Documentation" },
                { code: "22ECT218", name: "Control Systems Engineering" }
            ],
            5: [
                { code: "22ECT301", name: "Antenna & Wave Propagation" },
                { code: "22ECT302", name: "Digital CMOS IC" },
                { code: "22ECT303", name: "Embedded Systems" },
                { code: "22ECT304", name: "Microprocessors" },
                { code: "22ECT305", name: "VLSI Testing & Testability" },
                { code: "22ECT801", name: "Universal Human Values & Professional Ethics" }
            ],
            6: [
                { code: "22BMT302", name: "Management Principles for Engineers" },
                { code: "22ECT311", name: "Neural Networks & Fuzzy Logic" },
                { code: "22ECT312", name: "Optical Communication Systems" },
                { code: "22ECT313", name: "Satellite & Radar Engineering" },
                { code: "22ECT314", name: "Wireless & 5G Communication" },
                { code: '22ECT***', name: "Computer & Network Security", }
            ]

        }
    },
    mech: {
        name: 'Mechanical Engineering',
        icon: 'fa-microchip',
        subjects: {
            1: [
                { name: 'Applied Probability and Statistics', code: '22MET103 ' },
                { name: 'Casting, Welding and Forming', code: '22MET104' },
            ],
            2: [
                { name: 'Engineering Thermodynamics', code: '22MET106' },
                { name: 'Engineering Mechanics ', code: '22MET107' },
            ],
            3: [
                { name: 'Fluid Mechanics', code: '22MET201' },
                { name: 'Kinematics of Machines', code: '22MET202' },
                { name: 'Materials Science and Engineering', code: '22MET203' },
                { name: 'Mechanical Measurements and Metrology', code: '22MET204' },
                { name: 'Solid Mechanics', code: '22MET205' },
                { name: 'Basics of Management', code: '22BMT921' },
                { name: 'Computer-Aided Machine Drawing', code: '22MEP206' },
            ],
            4: [
                { name: 'Dynamics of Machines', code: '22MET251' },
                { name: 'Heat Transfer', code: '22MET252' },
                { name: 'I C Engines', code: '22MET253' },
                { name: 'Operations Planning and Control', code: '22MET254' },
                { name: 'Science of Machining', code: '22MET255' },
            ],
            5: [
                { name: 'CAD & CAM', code: '22MET301' },
                { name: 'Design of Machine Elements', code: '22MET302' },
                { name: 'Fluid and Turbo Machines', code: '22MET303' },
                { name: 'Industrial Engineering', code: '22MET304' },
                { name: 'Operations Research', code: '22MET305' },
                { name: 'Control System Engineering', code: '22EET341' },
            ],
            6: [
                { name: 'Advanced Machining & Additive Manufacturing', code: '22MET351' },
                { name: 'Design of Mechanical Systems', code: '22MET352' },
                { name: 'Refrigeration and Air Conditioning', code: '22MET353' },
            ]

        }
    },
    civil: {
        name: 'Civil Engineering',
        icon: 'fa-microchip',
        subjects: {
            1: [
                { name: 'Surveying', code: '22CEP104' },
            ],
            2: [
                { name: 'Mechanics of Solids', code: '22CET106' },
                { name: 'Engineering Geology', code: '22CET107' },
            ],
            3: [
                { name: 'Construction Materials', code: 'CET-201' },
                { name: 'Fluid Mechanics', code: 'CET-202' },
                { name: 'Surveying', code: 'CET-203' },
                { name: 'Mechanics of Solids', code: 'CET-204' },
                { name: 'Engineering Geology', code: 'CET-205' },
                { name: 'Mathematics III', code: 'MAT-206' },
            ],
            4: [
                { name: 'Building Technology', code: 'CET-221' },
                { name: 'Pipe & Channel Hydraulics', code: 'CET-222' },
                { name: 'Advanced Surveying', code: 'CET-223' },
                { name: 'Highway Engineering', code: 'CET-224' },
                { name: 'Structural Analysis-I', code: 'CET-225' },
                { name: 'Water Supply Engineering', code: 'CET-226' },
            ],
            5: [
                { name: 'Sanitary Engineering', code: 'CET-301' },
                { name: 'Structural Analysis-II', code: 'CET-302' },
                { name: 'Design of RC Structure', code: 'CET-303' },
                { name: 'Hydrology', code: 'CET-304' },
                { name: 'Soil Mechanics', code: 'CET-305' },
                { name: 'Estimating & Costing', code: 'CET-306' },
            ],
            6: [
                { name: 'Railway & Airport Engineering', code: 'CET-321' },
                { name: 'Design of Steel Structures', code: 'CET-322' },
                { name: 'Design of Foundations & Earth Structures', code: 'CET-323' },
                { name: 'Design of RC Systems', code: 'CET-324' },
                { name: 'Design of Masonry Structures', code: 'CET-325' },
                { name: 'Water Resources Engineering', code: 'CET-326' },
            ]
        }
    },
    electrical: {
        name: 'Electrical Engineering',
        icon: 'fa-microchip',
        subjects: {
            1: [
                { code: "EE101", name: "Basic Electrical Engineering" },
                { code: "EE103", name: "Power Generation Sources" },
            ],
            2: [
                { code: "EE201", name: "Network Theory" },
                { code: "EE202", name: "Measurements and Actuators" },
            ],
            3: [
                { code: "EE301", name: "Electrical Machines-I" },
                { code: "EE302", name: "Integrated Electronics" },
                { code: "MA301", name: "Advanced Engineering Mathematics" },
                { code: "EE303", name: "Analysis & Design of Digital Logic Circuits" },
                { code: "EE304", name: "Network, Systems and Signals" },
                { code: "CS301", name: "Advanced Programming for Design" },
            ],
            4: [
                { code: "EE401", name: "Microprocessor and Microcontroller" },
                { code: "EE402", name: "Electrical Machines-II" },
                { code: "EE403", name: "Transmission and Distribution Systems" },
                { code: "EE404", name: "Power Electronics-I" },
                { code: "EE405", name: "Control System Engineering" },
            ],
            5: [
                { code: "MG501", name: "Basics of Management" },
                { code: "EC501", name: "Principles of Communication Engineering" },
                { code: "EE501", name: "Power System Switchgear and Protection" },
                { code: "EE502", name: "Modern Control Engineering" },
                { code: "EE503", name: "Power Electronics-II" },
            ],
            6: [
                { code: "EE601", name: "Operation and Control of Power Systems" },
                { code: "EE602", name: "Electric Drives & Control" },
                { code: "EE603", name: "Digital Signal Processing and Applications" },
                { code: "EE604", name: "Advanced Power Transmission" },
                { code: "EE605", name: "Industrial Machine Learning" },
            ]
        }
    },
    chemical: {
        name: 'Chemical Engineering',
        icon: 'fa-microchip',
        subjects: {
            1: [
                { code: "22CHT101", name: "Introduction to Chemical Engineering" },
                { code: "22CHT102", name: "Chemical Engineering Thermodynamics-I" },
            ],
            2: [
                { code: "22CHT103", name: "Chemical Process Calculaions" },
                { code: "22CHT104", name: "Process Instrumentation" },
            ],
            3: [
                { code: "22CHT202", name: "Computer Aided Numerical Methods" },
                { code: "22CHT204", name: "Fluid Mechanics" },
                { code: "22CHT205", name: "Mechanical Operations" },
                { code: "22CHT201", name: "Chemical Engineering Thermodynamics-II" },
                { code: "22CHT203", name: "Conventional & Alternate Energy Resources" },
                { code: "22MST241", name: "Fundamentals of Materials Science and Engineering" }
            ],
            4: [
                { code: "22CHT251", name: "Chemical Reaction Engineering-I" },
                { code: "22CHT253", name: "Heat Transfer Operations" },
                { code: "22CHT255", name: "Mass Transfer-I" },
                { code: "22CHT254", name: "Industrial Pollution Abatement" },
                { code: "22CHT252", name: "Chemical Technology" },
                { code: "22RET291", name: "Energy Storage" }
            ],
            5: [
                { code: "22CHT305", name: "Mass Transfer-II" },
                { code: "22CHT301", name: "AI & ML in Chemical Engineering" },
                { code: "22CHT306", name: "Process Dynamics and Control" },
                { code: "22CHT307", name: "Process Safety and Hazards Management" },
                { code: "22CHT302", name: "Chemical Reaction Engineering-II" }
            ],
            6: [
                { code: "22CHT354", name: "Plant Design & Process Economics" },
                { code: "22CHT358", name: "Transport Phenomena" },
                { code: "22CHT353", name: "Petroleum Refining and Petrochemicals" },
                { code: "22CHT356", name: "Process Equipment Design" },
                { code: "22BMT922", name: "Management Principles for Engineers" }
            ]
        }
    },
    meta: {
        name: 'Metallurgical and Materials Engineering',
        icon: 'fa-microchip',
        subjects: {
            1: [
                { name: 'Introduction to Engineering Materials', code: '22MTT101' },
                { name: 'Fuels, Furnaces & Refractories ', code: '22MTT102' },
            ],
            2: [
                { name: 'Introduction to Physical Metallurgy', code: '22MTT103' },
                { name: 'Minerals Processing', code: '22MTT104' },
            ],
            3: [
                { name: 'Introduction to Extractive Metallurgy', code: '22MTT201' },
                { name: 'Introduction to Physical Metallurgy', code: '22MTT202' },
                { name: 'Thermodynamics of Materials', code: '22MTT203' },
                { name: 'Introduction to Engineering Materials', code: '22MTT204' },
                { name: 'Fuels, Furnaces & Refractories', code: '22MTT205' },
            ],
            4: [
                { name: 'Iron Making', code: '22MTT211' },
                { name: 'Transport Phenomenon', code: '22MTT212' },
                { name: 'Introduction to Nano Materials & Technology', code: '22MTT213' },
                { name: 'Mechanical Behaviour & Testing of Materials', code: '22MTT214' },
                { name: 'Mineral Processing', code: '22MTT215' },
            ],
            5: [
                { name: 'Foundry Technology', code: '22MTT301' },
                { name: 'Particulate Materials', code: '22MTT302' },
                { name: 'Non Ferrous Extractive Metallurgy', code: '22MTT303' },
                { name: 'Electrometallurgy & Corrosion', code: '22MTT304' },
                { name: 'Solid State Phase Transformations', code: '22MTT305' },
            ],
            6: [
                { name: 'Mechanical Working of Metals', code: '22MTT311' },
                { name: 'Polymeric & Ceramic Materials', code: '22MTT312' },
                { name: 'Materials in Industry', code: '22MTT313' },
                { name: 'Heat Treatment', code: '22MTT314' },
                { name: 'Steel Making', code: '22MTT315' },
            ]
        }
    },
    archi: {
        name: 'Architecture',
        icon: 'fa-microchip',
        subjects: {
            1: [
                { name: 'Environmental Science & Ecology', code: 'CET102' },
                { name: 'English', code: 'HST110' },
                { name: 'Mathematics I', code: 'MAT103' },
                { name: 'Introduction to Architecture and Basic Design', code: 'ART101' },
                { name: 'Architectural Drawing', code: 'ARP101' },
                { name: 'Architectural Orientation Techniques I', code: 'ARP105' },
            ],
            2: [
                { name: 'History of Architecture I', code: 'ART102' },
                { name: 'Theory of Design', code: 'ART104' },
                { name: 'Building Construction & Materials I', code: 'ART106' },
                { name: 'Comp. System and Programming', code: 'CPT110' },
                { name: 'Architecture Techniques II', code: 'ARP108' },
                { name: 'Architectural Design I', code: 'ARP110' }
            ],
            3: [
                { name: 'History of Architecture II', code: 'ART201' },
                { name: 'Building Science-I (Climatology)', code: 'ART203' },
                { name: 'Surveying', code: 'CET293' },
                { name: 'Building Construction & Materials II', code: 'ART205' },
                { name: 'Architectural Techniques III', code: 'ART207' },
                { name: 'Comp. Applications for Architects-I', code: 'ART209' },
                { name: 'Architectural Design II', code: 'ARP211' }
            ],
            4: [
                { name: 'History of Architecture III', code: 'ART202' },
                { name: 'Building Services I', code: 'ART204' },
                { name: 'Architectural Structures I', code: 'CET242' },
                { name: 'Program Elective-I', code: 'ARPE01' },
                { name: 'Building Construction & Materials III', code: 'ART206' },
                { name: 'Comp. Applications for Architects-II', code: 'ART208' },
                { name: 'Architectural Design III', code: 'ARP210' },
            ],
            5: [
                { name: 'History of Architecture IV', code: 'ART301' },
                { name: 'Quantity Survey and Specifications', code: 'ART303' },
                { name: 'Architectural Structures II', code: 'CET343' },
                { name: 'Program Elective-II', code: 'ARPE02' },
                { name: 'Building Construction & Materials IV', code: 'ART305' },
                { name: 'Program Elective-III', code: 'ARPE03' },
                { name: 'Architectural Design IV', code: 'ARP309' }
            ],
            6: [
                { name: 'Building Services II (Electrical)', code: 'ART302' },
                { name: 'Architectural Structures III', code: 'CET344' },
                { name: 'Program Elective-IV', code: 'ARPE04' },
                { name: 'Building Construction & Materials V', code: 'ARP305' },
                { name: 'Site Planning & Landscape', code: 'ART306' },
                { name: 'Architectural Design V', code: 'ARP310' },
            ],
            7: [
                { name: 'Building Science-II (Mechanical)', code: 'ART401' },
                { name: 'Architectural Structures IV', code: 'CET445' },
                { name: 'Introduction to Planning', code: 'ART403' },
                { name: 'Program Elective-V', code: 'ARPE06' },
                { name: 'Working Drawing', code: 'ARP407' },
                { name: 'Architectural Design VI', code: 'ARP409' }
            ],
            8: [
                { name: 'Practical Training', code: 'ARP402' }
            ],
            9: [
                { name: 'Building Services III (Mechanical)', code: 'ART501' },
                { name: 'Housing', code: 'ART503' },
                { name: 'Program Elective-VII', code: 'ARPE07' },
                { name: 'Thesis Seminar and Group Discussion', code: 'ARS507' },
                { name: 'Architectural Design VII', code: 'ARP511' },
            ],
            10: [
                { name: 'Professional Practice', code: 'ARPE08' },
                { name: 'Thesis', code: 'ARD506' },
            ]

        }
    },
    aide: {
        name: 'Artificial Intelligence and Data Engineering',
        icon: 'fa-microchip',
        subjects: {
            1: [
                { name: 'Discrete Structures', code: '22AIT1xx' },
                { name: 'Problem Solving with C', code: '22AIT1xx' },
            ],
            2: [
                { name: 'Data Structures and Algorithms', code: '22AIT1xx' },
                { name: 'Mathematics for AI', code: '22AIT1xx' },
            ],
            3: [
                { name: 'Digital Systems and Computer Architecture', code: '22AIT2xx' },
                { name: 'Algorithm Design', code: '22AIT2xx' },
                { name: 'Operating System Concepts', code: '22AIT2xx' },
                { name: 'Foundations of Data Science', code: '22AIT2xx' },
                { name: 'Automata Theory', code: '22AIT2xx' },
                { name: 'Social Sciences and Professional Ethics', code: '22HST2xx' },
            ],
            4: [
                { name: 'Artificial Neural Networks', code: '22AIT2xx' },
                { name: 'Introduction to Artificial Intelligence', code: '22AIT2xx' },
                { name: 'Introduction to Compiler Design', code: '22AIT2xx' },
                { name: 'Data Communication and Networks', code: '22AIT3xx' },
                { name: 'Database Management Systems', code: '22AIT2xx' },
                { name: 'Basics of Management', code: '22MMTxx' },
            ],
            5: [
                { name: 'Image Processing', code: '22AIT3xx' },
                { name: 'Principles of Machine Learning', code: '22AIT2xx' },
                { name: 'Big Data Analytics', code: '22AIT3xx' },
                { name: 'Information Retrieval', code: '22AIT2xx' },
                { name: 'Data Mining and Warehousing', code: '22AIT3xx' },
            ],
            6: [
                { name: 'Deep Learning', code: '22AIT3xx' },
                { name: 'Natural Language Processing', code: '22AIT3xx' },
                { name: 'High Performance Computing', code: '22AIT3xx' },
                { name: 'Information Security', code: '22AIT3xx' },
                { name: 'Wireless and 5G Communication', code: '22ECxxx' },
            ]
        }
    },
};
