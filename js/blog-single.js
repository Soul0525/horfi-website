/**
 * Blog Single Page Handler
 * Fetches and displays a single blog post with related content
 * 
 * @author House of Refuge Foundation, Inc.
 * @version 1.0.0
 */

(function() {
  'use strict';

  // ===========================================
  // CONFIGURATION
  // ===========================================
  const CONFIG = {
    apiBase: 'https://panel.horfi.online/api',
    corsProxy: 'https://corsproxy.io/?',
    useSampleData: true,
    relatedPostsCount: 3
  };

  // ===========================================
  // SAMPLE DATA
  // ===========================================
  const SAMPLE_POSTS = [
    {
      id: 1,
      title: "Christmas Celebration with Our Children",
      excerpt: "This year's Christmas celebration was filled with joy and laughter as our children received gifts and shared meals together with volunteers and donors.",
      content: `
        <p>The holiday season at House of Refuge Foundation is always a special time. This year's Christmas celebration was particularly memorable, filled with joy, laughter, and the spirit of giving that defines our community.</p>
        
        <h2>A Day of Joy and Celebration</h2>
        <p>On December 25th, our home was transformed into a winter wonderland (tropical style!) with decorations made by our children. The excitement in the air was palpable as everyone gathered for our annual Christmas program.</p>
        
        <p>The day began with a special thanksgiving service where our children shared their gratitude for the blessings they've received throughout the year. It was heartwarming to hear their stories of growth, hope, and faith.</p>
        
        <blockquote>
          <p>"Christmas at House of Refuge is not just about gifts. It's about family, love, and knowing that we belong somewhere."</p>
          <cite>— Maria, 12 years old</cite>
        </blockquote>
        
        <h2>Gifts from Generous Donors</h2>
        <p>Thanks to our incredible donors and sponsors, every child received carefully selected gifts. From educational toys for the younger ones to books and art supplies for the older children, each gift was chosen with love and thoughtfulness.</p>
        
        <p>We are especially grateful to the following groups who made this possible:</p>
        <ul>
          <li>Local church communities who organized gift-giving drives</li>
          <li>Corporate sponsors who donated supplies and treats</li>
          <li>Individual donors who sponsored specific children</li>
          <li>Volunteer groups who helped with preparations</li>
        </ul>
        
        <h2>A Feast to Remember</h2>
        <p>The Christmas feast was a highlight of the day. Our kitchen staff and volunteers prepared a delicious spread of traditional Filipino Christmas dishes including:</p>
        
        <ul>
          <li>Lechon (roasted pig)</li>
          <li>Pancit (noodles)</li>
          <li>Fruit salad</li>
          <li>Spaghetti</li>
          <li>And of course, lots of desserts!</li>
        </ul>
        
        <h2>Looking Forward</h2>
        <p>As we enter the new year, we carry with us the warmth and love shared during this Christmas season. We are reminded of our mission and the importance of providing a loving home for children who need it most.</p>
        
        <p>Thank you to everyone who made this Christmas special. Your generosity and kindness continue to make a difference in the lives of our children.</p>
      `,
      category: "events",
      image: "img/portfolio/6.jpg",
      author: {
        name: "HORFI Admin",
        avatar: "img/HORFI logo.png",
        bio: "House of Refuge Foundation, Inc. is dedicated to providing care, shelter, and support to abandoned, neglected, and orphaned children in the Philippines."
      },
      date: "2025-12-25",
      readTime: 5,
      tags: ["Christmas", "Celebration", "Children", "Donors", "Events"]
    },
    {
      id: 2,
      title: "New Educational Program Launch",
      excerpt: "We are excited to announce our new educational support program that will help our children excel in their academic pursuits.",
      content: `
        <p>Education is one of the most powerful tools we can give our children. Today, we are thrilled to announce the launch of our comprehensive Educational Support Program, designed to help every child at House of Refuge reach their full academic potential.</p>
        
        <h2>Program Overview</h2>
        <p>The new program includes several key components:</p>
        
        <h3>1. Tutoring Services</h3>
        <p>Professional tutors will provide one-on-one and small group tutoring sessions in core subjects including Mathematics, Science, English, and Filipino. Sessions are scheduled after school hours and on weekends.</p>
        
        <h3>2. Computer Literacy</h3>
        <p>In today's digital world, computer skills are essential. Our new computer lab, equipped with 10 desktop computers, will offer classes in basic computer operations, internet safety, and productivity tools.</p>
        
        <h3>3. Reading Enhancement</h3>
        <p>Our expanded library now houses over 500 books appropriate for various age groups. A dedicated reading corner and regular storytelling sessions will foster a love for reading among our children.</p>
        
        <blockquote>
          <p>"Every child deserves access to quality education. This program is our commitment to ensuring our children have the tools they need to succeed."</p>
          <cite>— Foundation Director</cite>
        </blockquote>
        
        <h2>Expected Outcomes</h2>
        <p>We aim to achieve the following goals within the first year:</p>
        <ul>
          <li>Improve overall grades by at least one letter grade</li>
          <li>100% computer literacy among children aged 8 and above</li>
          <li>Establish a daily reading habit for all children</li>
          <li>Increase school attendance to 98%</li>
        </ul>
        
        <h2>How You Can Help</h2>
        <p>This program is made possible through the generous support of our donors. You can contribute by:</p>
        <ul>
          <li>Sponsoring a child's educational needs</li>
          <li>Donating books or school supplies</li>
          <li>Volunteering as a tutor</li>
          <li>Providing financial support for the program</li>
        </ul>
        
        <p>Together, we can give these children the education they deserve and the future they dream of.</p>
      `,
      category: "announcements",
      image: "img/portfolio/11.jpg",
      author: {
        name: "HORFI Admin",
        avatar: "img/HORFI logo.png",
        bio: "House of Refuge Foundation, Inc. is dedicated to providing care, shelter, and support to abandoned, neglected, and orphaned children in the Philippines."
      },
      date: "2025-11-15",
      readTime: 4,
      tags: ["Education", "Programs", "Announcements", "Children"]
    },
    {
      id: 3,
      title: "A Story of Hope: Maria's Journey",
      excerpt: "Maria came to House of Refuge at age 7. Today, she is a college graduate working as a nurse. Read her inspiring story of transformation.",
      content: `
        <p>Some stories remind us why we do what we do. Maria's journey from a frightened 7-year-old to a confident registered nurse is one such story—a testament to the transformative power of love, care, and opportunity.</p>
        
        <h2>The Beginning</h2>
        <p>Maria arrived at House of Refuge on a rainy evening in 2010. She was small for her age, quiet, and carried with her only a worn backpack and years of trauma. Found wandering alone near a bus terminal, she had no identification and couldn't remember her family's address.</p>
        
        <p>Those first months were challenging. Maria barely spoke and often had nightmares. But slowly, with patience and consistent care from our staff, she began to open up.</p>
        
        <blockquote>
          <p>"I remember the first time I felt safe. It was when Ate Rose tucked me in and promised that no one would hurt me anymore. I finally slept peacefully that night."</p>
          <cite>— Maria</cite>
        </blockquote>
        
        <h2>Finding Her Voice</h2>
        <p>By age 10, Maria had transformed. She was excelling in school, had made friends, and discovered a passion for helping others. When younger children arrived at the shelter, she was often the first to comfort them, sharing her own experience of finding a home.</p>
        
        <h2>The Dream of Nursing</h2>
        <p>At 14, Maria announced her dream: she wanted to become a nurse. "I want to take care of people the way the staff here took care of me," she said. From that moment, she worked tirelessly toward that goal.</p>
        
        <p>Her journey wasn't easy. There were financial challenges, moments of self-doubt, and the constant reminder that she was different from her classmates who had traditional families. But she persevered.</p>
        
        <h2>Graduation Day</h2>
        <p>In March 2025, Maria walked across the stage to receive her nursing degree. The entire House of Refuge family was there, cheering the loudest. It was a moment 15 years in the making.</p>
        
        <p>"When they called my name, I thought about every person who helped me get here—every donor, every volunteer, every staff member. This degree belongs to all of us."</p>
        
        <h2>Giving Back</h2>
        <p>Today, Maria works at a hospital in Quezon City. She regularly visits House of Refuge, mentoring the older children and sharing her story. She has also started a small scholarship fund for her younger "siblings" at the foundation.</p>
        
        <p>Maria's story is not just about one girl's success. It's proof that with the right support, every child can overcome their circumstances and achieve their dreams.</p>
        
        <h2>Your Role in Stories Like Maria's</h2>
        <p>Every donation, every volunteer hour, every prayer contributes to more stories like Maria's. There are currently 45 children at House of Refuge, each with their own dreams and potential. With your help, they too can write their own success stories.</p>
      `,
      category: "stories",
      image: "img/portfolio/13.jpg",
      author: {
        name: "HORFI Admin",
        avatar: "img/HORFI logo.png",
        bio: "House of Refuge Foundation, Inc. is dedicated to providing care, shelter, and support to abandoned, neglected, and orphaned children in the Philippines."
      },
      date: "2025-10-20",
      readTime: 8,
      tags: ["Success Stories", "Inspiration", "Alumni", "Nursing"]
    },
    {
      id: 4,
      title: "Monthly Update: October 2025",
      excerpt: "Here's what happened at House of Refuge this month - new arrivals, achievements, and upcoming events.",
      content: `
        <p>Another month has passed, and we're excited to share the highlights from October at House of Refuge Foundation. It's been a busy month filled with new beginnings, achievements, and preparations for the holiday season.</p>
        
        <h2>New Family Members</h2>
        <p>This month, we welcomed two new children to our home:</p>
        <ul>
          <li><strong>Paolo, 6 years old</strong> - A cheerful boy who loves drawing and has already made friends with everyone.</li>
          <li><strong>Anna, 9 years old</strong> - A quiet but bright girl who shows great promise in mathematics.</li>
        </ul>
        
        <p>Both children are adjusting well to their new environment, and we're grateful to have them as part of our family.</p>
        
        <h2>Academic Achievements</h2>
        <p>We're proud to announce that several of our children received recognition at school this month:</p>
        <ul>
          <li>Three students made the honor roll</li>
          <li>Two students won prizes in the school science fair</li>
          <li>Our debate team placed second in the district competition</li>
        </ul>
        
        <h2>Health and Wellness</h2>
        <p>Our annual dental mission was a success, with all 45 children receiving dental check-ups and necessary treatments. Thank you to the volunteer dentists who donated their time and expertise!</p>
        
        <h2>Facility Updates</h2>
        <p>Thanks to generous donations, we completed the following improvements:</p>
        <ul>
          <li>Repainted the children's dormitories</li>
          <li>Installed new ceiling fans in the study area</li>
          <li>Upgraded the kitchen equipment</li>
        </ul>
        
        <h2>Upcoming Events</h2>
        <p>Mark your calendars for these upcoming events:</p>
        <ul>
          <li><strong>November 15</strong> - Foundation Anniversary Celebration</li>
          <li><strong>November 28</strong> - Thanksgiving Dinner with Sponsors</li>
          <li><strong>December 20</strong> - Christmas Party</li>
        </ul>
        
        <h2>How to Get Involved</h2>
        <p>We're always looking for volunteers and supporters. If you'd like to help, please contact us or visit our donation page. Every contribution makes a difference!</p>
      `,
      category: "updates",
      image: "img/portfolio/27.jpg",
      author: {
        name: "HORFI Admin",
        avatar: "img/HORFI logo.png",
        bio: "House of Refuge Foundation, Inc. is dedicated to providing care, shelter, and support to abandoned, neglected, and orphaned children in the Philippines."
      },
      date: "2025-10-31",
      readTime: 3,
      tags: ["Monthly Update", "News", "Children", "Events"]
    },
    {
      id: 5,
      title: "Volunteer Appreciation Day 2025",
      excerpt: "We celebrated our amazing volunteers who dedicate their time and skills to make a difference in our children's lives.",
      content: `
        <p>On September 15th, we hosted our annual Volunteer Appreciation Day to honor the incredible individuals who give their time, talents, and hearts to House of Refuge Foundation. This year's celebration was extra special as we recognized volunteers who have been with us for over a decade.</p>
        
        <h2>Our Volunteer Family</h2>
        <p>Over the past year, more than 150 volunteers have contributed to our mission. From tutoring sessions to medical missions, from facility maintenance to administrative support, their contributions have been invaluable.</p>
        
        <h2>Special Recognition Awards</h2>
        <p>This year, we presented special awards to outstanding volunteers:</p>
        
        <h3>Volunteer of the Year</h3>
        <p>Congratulations to <strong>Teacher Mila Santos</strong>, who has been tutoring our children every weekend for the past five years. Her dedication to education has helped countless children improve their grades and develop a love for learning.</p>
        
        <h3>10-Year Service Award</h3>
        <p>We honored three volunteers who have been with us for a decade:</p>
        <ul>
          <li>Dr. Ramon Cruz - Medical volunteer</li>
          <li>Mrs. Elena Reyes - Administrative support</li>
          <li>Mr. Jose Garcia - Facility maintenance</li>
        </ul>
        
        <blockquote>
          <p>"Volunteering at House of Refuge has been one of the most rewarding experiences of my life. Seeing the children grow and succeed makes every moment worthwhile."</p>
          <cite>— Teacher Mila Santos, Volunteer of the Year</cite>
        </blockquote>
        
        <h2>The Celebration</h2>
        <p>The children prepared special performances to thank the volunteers, including songs, dances, and heartfelt speeches. There wasn't a dry eye in the house when little Tommy, age 8, stood up to thank "the uncles and aunties who help us every day."</p>
        
        <h2>Become a Volunteer</h2>
        <p>Interested in joining our volunteer family? We welcome individuals and groups who want to make a difference. Whether you have professional skills to share or simply want to spend time with the children, there's a place for you here.</p>
        
        <p>Contact us to learn about volunteer opportunities!</p>
      `,
      category: "events",
      image: "img/portfolio/31.jpg",
      author: {
        name: "HORFI Admin",
        avatar: "img/HORFI logo.png",
        bio: "House of Refuge Foundation, Inc. is dedicated to providing care, shelter, and support to abandoned, neglected, and orphaned children in the Philippines."
      },
      date: "2025-09-15",
      readTime: 4,
      tags: ["Volunteers", "Appreciation", "Events", "Community"]
    },
    {
      id: 6,
      title: "Building Expansion Announcement",
      excerpt: "Great news! Thanks to generous donations, we are expanding our facilities to accommodate more children in need.",
      content: `
        <p>We are thrilled to announce a major milestone in the history of House of Refuge Foundation: the groundbreaking of our new building expansion! This project will allow us to serve more children and provide better facilities for our growing family.</p>
        
        <h2>The Need for Expansion</h2>
        <p>Over the past decade, the number of children needing care has steadily increased. Our current facility, while well-maintained, has reached its capacity. We've had to turn away children in need simply because we don't have enough space.</p>
        
        <p>This expansion changes everything.</p>
        
        <h2>What the Expansion Includes</h2>
        <p>The new building will feature:</p>
        
        <h3>Additional Dormitories</h3>
        <ul>
          <li>Two new dormitory wings with capacity for 30 additional children</li>
          <li>Separate sections for different age groups</li>
          <li>Modern ventilation and safety features</li>
        </ul>
        
        <h3>Learning Center</h3>
        <ul>
          <li>Expanded library with reading nooks</li>
          <li>Computer laboratory with 20 stations</li>
          <li>Multipurpose classroom for tutorials and workshops</li>
        </ul>
        
        <h3>Recreation Area</h3>
        <ul>
          <li>Indoor play area for younger children</li>
          <li>Arts and crafts room</li>
          <li>Small gymnasium for physical activities</li>
        </ul>
        
        <h2>Timeline and Budget</h2>
        <p>Construction is expected to take 18 months, with completion targeted for early 2027. The total project cost is estimated at ₱15 million.</p>
        
        <p>Thanks to our major donors, we have already raised 60% of the needed funds. We are launching a campaign to raise the remaining ₱6 million.</p>
        
        <h2>How You Can Help</h2>
        <p>Every contribution brings us closer to our goal:</p>
        <ul>
          <li><strong>₱500</strong> - Provides one bag of cement</li>
          <li><strong>₱2,000</strong> - Sponsors one window</li>
          <li><strong>₱5,000</strong> - Furnishes one bed</li>
          <li><strong>₱10,000</strong> - Names a brick in the donor wall</li>
          <li><strong>₱50,000</strong> - Sponsors a room</li>
        </ul>
        
        <p>Together, we can build a bigger home for more children in need. Join us in this exciting project!</p>
      `,
      category: "announcements",
      image: "img/portfolio/36.jpg",
      author: {
        name: "HORFI Admin",
        avatar: "img/HORFI logo.png",
        bio: "House of Refuge Foundation, Inc. is dedicated to providing care, shelter, and support to abandoned, neglected, and orphaned children in the Philippines."
      },
      date: "2025-08-10",
      readTime: 5,
      tags: ["Expansion", "Building", "Announcements", "Donations"]
    },
    {
      id: 7,
      title: "From Abandoned to Adopted: Juan's Story",
      excerpt: "Juan was found abandoned at a bus station. After two years of care and love at HORFI, he found his forever family.",
      content: `
        <p>Every child deserves a family. For Juan, that dream came true after a journey that began in the most heartbreaking way imaginable.</p>
        
        <h2>Found Alone</h2>
        <p>In July 2023, a security guard at a Quezon City bus station noticed a small boy sitting alone on a bench. The boy, who appeared to be about 4 years old, had been there for hours. When approached, he could only say his name: Juan.</p>
        
        <p>After authorities determined that Juan had been abandoned, he was brought to House of Refuge. He arrived with nothing but the clothes on his back and a look of confusion that broke everyone's heart.</p>
        
        <h2>Healing and Growth</h2>
        <p>The first few months were challenging. Juan had difficulty trusting adults and often withdrew from other children. Our team of caregivers worked patiently with him, providing consistent love and support.</p>
        
        <blockquote>
          <p>"Juan taught us that healing doesn't happen overnight. But with patience and unconditional love, even the deepest wounds can begin to heal."</p>
          <cite>— Ate Rose, Caregiver</cite>
        </blockquote>
        
        <p>Slowly, Juan began to emerge from his shell. He discovered a love for music and would often be found humming songs. He made friends and started excelling in his classes. The transformation was remarkable.</p>
        
        <h2>Meeting the Santos Family</h2>
        <p>In early 2025, the Santos family visited House of Refuge. They had been wanting to adopt for years and were drawn to Juan's story. Their first meeting was magical—Juan, now 6, immediately bonded with them.</p>
        
        <p>After months of getting to know each other through regular visits, the Santos family officially began the adoption process.</p>
        
        <h2>A Forever Home</h2>
        <p>On September 1, 2025, the adoption was finalized. Juan officially became Juan Santos, with a mom, a dad, and two older siblings who adore him.</p>
        
        <p>"When the judge announced the adoption was complete, Juan turned to us and said, 'I have a family now,'" recalls Mrs. Santos. "There wasn't a dry eye in the courtroom."</p>
        
        <h2>Keeping in Touch</h2>
        <p>The Santos family visits House of Refuge regularly. Juan loves showing off his new family to his old friends and encouraging them that they too will find their forever homes.</p>
        
        <h2>Supporting More Stories Like Juan's</h2>
        <p>While adoption is the goal for some children, House of Refuge serves as a permanent home for others. Your support ensures that every child in our care receives the love, education, and opportunities they deserve—whether they stay with us or find their forever families.</p>
      `,
      category: "stories",
      image: "img/portfolio/56.jpg",
      author: {
        name: "HORFI Admin",
        avatar: "img/HORFI logo.png",
        bio: "House of Refuge Foundation, Inc. is dedicated to providing care, shelter, and support to abandoned, neglected, and orphaned children in the Philippines."
      },
      date: "2025-07-22",
      readTime: 7,
      tags: ["Adoption", "Success Stories", "Children", "Family"]
    },
    {
      id: 8,
      title: "Back to School 2025",
      excerpt: "Our children are ready for the new school year! Thanks to our sponsors, everyone has new uniforms and school supplies.",
      content: `
        <p>The excitement of a new school year is in the air! Thanks to the incredible generosity of our sponsors and donors, all 45 children at House of Refuge are fully prepared for the 2025-2026 academic year.</p>
        
        <h2>Ready for Success</h2>
        <p>Each child received a complete back-to-school package including:</p>
        <ul>
          <li>New school uniforms (2 sets each)</li>
          <li>School shoes and PE shoes</li>
          <li>Backpack filled with supplies</li>
          <li>Notebooks, paper, and writing materials</li>
          <li>Scientific calculator (for high school students)</li>
        </ul>
        
        <h2>Enrollment Summary</h2>
        <p>Our children are enrolled in various grade levels:</p>
        <ul>
          <li><strong>Elementary:</strong> 25 students</li>
          <li><strong>Junior High School:</strong> 12 students</li>
          <li><strong>Senior High School:</strong> 6 students</li>
          <li><strong>College:</strong> 2 students</li>
        </ul>
        
        <h2>First Day Photos</h2>
        <p>The first day of school was filled with nervous excitement. Our staff woke up early to prepare breakfast and help the children get ready. Seeing them march out in their crisp new uniforms, heads held high, was a proud moment for everyone.</p>
        
        <blockquote>
          <p>"I'm excited to meet my new teacher and see my friends again. Thank you to everyone who helped us get our school things!"</p>
          <cite>— Lily, Grade 4</cite>
        </blockquote>
        
        <h2>Academic Support</h2>
        <p>Our educational support program continues throughout the school year:</p>
        <ul>
          <li>Daily homework assistance sessions</li>
          <li>Weekly tutoring for struggling subjects</li>
          <li>Monthly progress monitoring</li>
          <li>Recognition for academic achievements</li>
        </ul>
        
        <h2>Thank You, Sponsors!</h2>
        <p>This wouldn't be possible without you. Your support ensures that our children start each school year with confidence and the tools they need to succeed. Thank you for investing in their future!</p>
      `,
      category: "updates",
      image: "img/portfolio/62.jpg",
      author: {
        name: "HORFI Admin",
        avatar: "img/HORFI logo.png",
        bio: "House of Refuge Foundation, Inc. is dedicated to providing care, shelter, and support to abandoned, neglected, and orphaned children in the Philippines."
      },
      date: "2025-06-01",
      readTime: 3,
      tags: ["Education", "Back to School", "Updates", "Sponsors"]
    },
    {
      id: 9,
      title: "Health and Wellness Program Results",
      excerpt: "Our annual health checkup shows significant improvement in our children's overall health and nutrition status.",
      content: `
        <p>We are pleased to share the results of our annual comprehensive health assessment. The findings show remarkable improvements in our children's overall health and well-being, a testament to our holistic care approach.</p>
        
        <h2>Health Assessment Overview</h2>
        <p>In partnership with volunteer medical professionals, we conducted thorough health evaluations for all 45 children in our care. The assessment included:</p>
        <ul>
          <li>Complete physical examination</li>
          <li>Nutritional assessment</li>
          <li>Dental check-up</li>
          <li>Vision and hearing screening</li>
          <li>Developmental evaluation</li>
        </ul>
        
        <h2>Key Findings</h2>
        
        <h3>Nutrition</h3>
        <p>Compared to last year's assessment:</p>
        <ul>
          <li>Cases of underweight children decreased by 40%</li>
          <li>Average height-for-age improved significantly</li>
          <li>No cases of severe malnutrition</li>
        </ul>
        
        <h3>Dental Health</h3>
        <ul>
          <li>Cavity rates dropped by 35%</li>
          <li>All children now brush teeth twice daily</li>
          <li>Regular fluoride treatments implemented</li>
        </ul>
        
        <h3>Vision and Hearing</h3>
        <ul>
          <li>5 children received new prescription eyeglasses</li>
          <li>No hearing issues detected</li>
        </ul>
        
        <blockquote>
          <p>"The improvement in these children's health metrics is remarkable. Consistent nutrition, regular medical care, and a loving environment make all the difference."</p>
          <cite>— Dr. Maria Santos, Volunteer Pediatrician</cite>
        </blockquote>
        
        <h2>Our Health and Wellness Program</h2>
        <p>These results are the outcome of our comprehensive program:</p>
        
        <h3>Nutrition</h3>
        <ul>
          <li>Balanced meals prepared by trained kitchen staff</li>
          <li>Fresh fruits and vegetables daily</li>
          <li>Milk and vitamin supplements</li>
          <li>No junk food policy</li>
        </ul>
        
        <h3>Physical Activity</h3>
        <ul>
          <li>Daily outdoor play time</li>
          <li>Weekly organized sports activities</li>
          <li>Dance and movement sessions</li>
        </ul>
        
        <h3>Mental Health</h3>
        <ul>
          <li>Regular counseling sessions</li>
          <li>Art and music therapy</li>
          <li>Stress-management activities</li>
        </ul>
        
        <h2>Thank You to Our Medical Volunteers</h2>
        <p>This assessment was made possible by the generous donation of time and expertise by our volunteer medical professionals. We are grateful for their continued support of our children's health.</p>
      `,
      category: "updates",
      image: "img/portfolio/78.jpg",
      author: {
        name: "HORFI Admin",
        avatar: "img/HORFI logo.png",
        bio: "House of Refuge Foundation, Inc. is dedicated to providing care, shelter, and support to abandoned, neglected, and orphaned children in the Philippines."
      },
      date: "2025-05-15",
      readTime: 4,
      tags: ["Health", "Wellness", "Medical", "Updates"]
    }
  ];

  // ===========================================
  // STATE
  // ===========================================
  let state = {
    currentPost: null,
    allPosts: [],
    isLoading: true,
    hasError: false
  };

  // ===========================================
  // DOM ELEMENTS
  // ===========================================
  const elements = {};

  // ===========================================
  // UTILITY FUNCTIONS
  // ===========================================

  /**
   * Get URL parameter by name
   * @param {string} name - Parameter name
   * @returns {string|null} Parameter value
   */
  function getUrlParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  /**
   * Sanitize HTML to prevent XSS
   * @param {string} str - Input string
   * @returns {string} Sanitized string
   */
  function sanitizeHTML(str) {
    if (!str) return '';
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
  }

  /**
   * Format date to readable string
   * @param {string} dateStr - Date string
   * @returns {string} Formatted date
   */
  function formatDate(dateStr) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-US', options);
  }

  /**
   * Truncate text to specified length
   * @param {string} text - Text to truncate
   * @param {number} length - Max length
   * @returns {string} Truncated text
   */
  function truncateText(text, length = 100) {
    if (!text || text.length <= length) return text;
    return text.substring(0, length).trim() + '...';
  }

  /**
   * Calculate reading time
   * @param {string} content - Article content
   * @returns {number} Minutes to read
   */
  function calculateReadTime(content) {
    if (!content) return 5;
    const wordsPerMinute = 200;
    const text = content.replace(/<[^>]*>/g, '');
    const wordCount = text.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute) || 5;
  }

  // ===========================================
  // API FUNCTIONS
  // ===========================================

  /**
   * Fetch all posts
   * @returns {Promise<Array>} Array of posts
   */
  async function fetchAllPosts() {
    if (CONFIG.useSampleData) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return SAMPLE_POSTS;
    }

    try {
      const response = await fetch(CONFIG.corsProxy + encodeURIComponent(CONFIG.apiBase + '/blogs'), {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.data || data || [];
    } catch (error) {
      console.error('Error fetching posts:', error);
      return SAMPLE_POSTS;
    }
  }

  /**
   * Get post by ID
   * @param {number|string} id - Post ID
   * @returns {Object|null} Post object
   */
  function getPostById(id) {
    const postId = parseInt(id, 10);
    return state.allPosts.find(post => post.id === postId) || null;
  }

  // ===========================================
  // RENDER FUNCTIONS
  // ===========================================

  /**
   * Render article content
   * @param {Object} post - Post data
   */
  function renderArticle(post) {
    // Update page title
    document.title = `${post.title} - House of Refuge Foundation Inc.`;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', post.excerpt);
    }

    // Category
    const categoryEl = document.getElementById('article-category');
    if (categoryEl) {
      categoryEl.textContent = post.category;
      categoryEl.className = `article-category category-${post.category}`;
    }

    // Title
    const titleEl = document.getElementById('article-title');
    if (titleEl) {
      titleEl.textContent = post.title;
    }

    // Author
    const authorAvatar = document.getElementById('author-avatar');
    if (authorAvatar) {
      authorAvatar.src = post.author?.avatar || 'img/HORFI logo.png';
      authorAvatar.alt = post.author?.name || 'HORFI Admin';
    }

    const authorName = document.getElementById('author-name');
    if (authorName) {
      authorName.textContent = post.author?.name || 'HORFI Admin';
    }

    // Date
    const dateEl = document.getElementById('article-date');
    if (dateEl) {
      dateEl.textContent = formatDate(post.date);
    }

    // Read time
    const readTimeEl = document.getElementById('article-read-time');
    if (readTimeEl) {
      readTimeEl.textContent = post.readTime || calculateReadTime(post.content);
    }

    // Featured image
    const imageEl = document.getElementById('article-image');
    if (imageEl) {
      imageEl.src = post.image || 'img/portfolio/6.jpg';
      imageEl.alt = post.title;
    }

    // Content
    const bodyEl = document.getElementById('article-body');
    if (bodyEl) {
      bodyEl.innerHTML = post.content || '<p>No content available.</p>';
    }

    // Tags
    const tagsEl = document.getElementById('article-tags');
    if (tagsEl && post.tags && post.tags.length > 0) {
      tagsEl.innerHTML = '<span class="tags-label">Tags:</span>' +
        post.tags.map(tag => `<a href="blog.html?search=${encodeURIComponent(tag)}" class="tag">${sanitizeHTML(tag)}</a>`).join('');
    }

    // Author bio
    const authorBioAvatar = document.getElementById('author-bio-avatar');
    if (authorBioAvatar) {
      authorBioAvatar.src = post.author?.avatar || 'img/HORFI logo.png';
    }

    const authorBioName = document.getElementById('author-bio-name');
    if (authorBioName) {
      authorBioName.textContent = post.author?.name || 'HORFI Admin';
    }

    const authorBioDescription = document.getElementById('author-bio-description');
    if (authorBioDescription) {
      authorBioDescription.textContent = post.author?.bio || 'House of Refuge Foundation, Inc. is dedicated to providing care, shelter, and support to abandoned, neglected, and orphaned children in the Philippines.';
    }

    // Share buttons
    updateShareButtons(post);

    // Post navigation
    updatePostNavigation(post);
  }

  /**
   * Update share buttons with current URL
   * @param {Object} post - Post data
   */
  function updateShareButtons(post) {
    const currentUrl = window.location.href;
    const encodedUrl = encodeURIComponent(currentUrl);
    const encodedTitle = encodeURIComponent(post.title);

    const facebookBtn = document.getElementById('share-facebook');
    if (facebookBtn) {
      facebookBtn.href = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    }

    const twitterBtn = document.getElementById('share-twitter');
    if (twitterBtn) {
      twitterBtn.href = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
    }

    const linkedinBtn = document.getElementById('share-linkedin');
    if (linkedinBtn) {
      linkedinBtn.href = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`;
    }

    const emailBtn = document.getElementById('share-email');
    if (emailBtn) {
      emailBtn.href = `mailto:?subject=${encodedTitle}&body=Check out this article: ${currentUrl}`;
    }
  }

  /**
   * Update post navigation (prev/next)
   * @param {Object} post - Current post
   */
  function updatePostNavigation(post) {
    const currentIndex = state.allPosts.findIndex(p => p.id === post.id);

    // Previous post
    const prevNav = document.getElementById('nav-prev');
    const prevTitle = document.getElementById('prev-title');
    if (currentIndex < state.allPosts.length - 1) {
      const prevPost = state.allPosts[currentIndex + 1];
      if (prevNav && prevTitle) {
        prevNav.href = `blog-single.html?id=${prevPost.id}`;
        prevTitle.textContent = truncateText(prevPost.title, 50);
        prevNav.classList.remove('d-none');
      }
    }

    // Next post
    const nextNav = document.getElementById('nav-next');
    const nextTitle = document.getElementById('next-title');
    if (currentIndex > 0) {
      const nextPost = state.allPosts[currentIndex - 1];
      if (nextNav && nextTitle) {
        nextNav.href = `blog-single.html?id=${nextPost.id}`;
        nextTitle.textContent = truncateText(nextPost.title, 50);
        nextNav.classList.remove('d-none');
      }
    }
  }

  /**
   * Render recent posts in sidebar
   */
  function renderRecentPosts() {
    const container = document.getElementById('recent-posts-list');
    if (!container) return;

    const recentPosts = state.allPosts
      .filter(p => p.id !== state.currentPost?.id)
      .slice(0, 4);

    container.innerHTML = recentPosts.map(post => `
      <div class="recent-post-item">
        <img src="${post.image || 'img/portfolio/6.jpg'}" alt="${sanitizeHTML(post.title)}">
        <div class="recent-post-content">
          <h5><a href="blog-single.html?id=${post.id}">${sanitizeHTML(truncateText(post.title, 50))}</a></h5>
          <span class="recent-post-date"><i class="bi bi-calendar3"></i> ${formatDate(post.date)}</span>
        </div>
      </div>
    `).join('');
  }

  /**
   * Render category counts in sidebar
   */
  function renderCategoryCounts() {
    const categories = ['all', 'stories', 'updates', 'events', 'announcements'];

    categories.forEach(category => {
      const countEl = document.getElementById(`count-${category}`);
      if (countEl) {
        if (category === 'all') {
          countEl.textContent = state.allPosts.length;
        } else {
          const count = state.allPosts.filter(p => 
            p.category?.toLowerCase() === category
          ).length;
          countEl.textContent = count;
        }
      }
    });
  }

  /**
   * Render related posts
   * @param {Object} post - Current post
   */
  function renderRelatedPosts(post) {
    const section = document.getElementById('related-posts-section');
    const container = document.getElementById('related-posts-container');
    if (!section || !container) return;

    // Get posts in same category, excluding current
    let relatedPosts = state.allPosts
      .filter(p => p.id !== post.id && p.category === post.category)
      .slice(0, CONFIG.relatedPostsCount);

    // If not enough, add posts from other categories
    if (relatedPosts.length < CONFIG.relatedPostsCount) {
      const additionalPosts = state.allPosts
        .filter(p => p.id !== post.id && !relatedPosts.find(rp => rp.id === p.id))
        .slice(0, CONFIG.relatedPostsCount - relatedPosts.length);
      relatedPosts = [...relatedPosts, ...additionalPosts];
    }

    if (relatedPosts.length === 0) {
      section.classList.add('d-none');
      return;
    }

    container.innerHTML = relatedPosts.map(relatedPost => `
      <div class="col-lg-4 col-md-6" data-aos="fade-up">
        <article class="blog-card">
          <div class="blog-card-image">
            <img src="${relatedPost.image || 'img/portfolio/6.jpg'}" alt="${sanitizeHTML(relatedPost.title)}" loading="lazy">
            <span class="blog-card-category">${sanitizeHTML(relatedPost.category)}</span>
          </div>
          <div class="blog-card-body">
            <div class="blog-card-meta">
              <span><i class="bi bi-calendar3"></i> ${formatDate(relatedPost.date)}</span>
              <span><i class="bi bi-clock"></i> ${relatedPost.readTime || 5} min read</span>
            </div>
            <h3 class="blog-card-title">
              <a href="blog-single.html?id=${relatedPost.id}">${sanitizeHTML(relatedPost.title)}</a>
            </h3>
            <p class="blog-card-excerpt">${sanitizeHTML(truncateText(relatedPost.excerpt, 100))}</p>
            <a href="blog-single.html?id=${relatedPost.id}" class="blog-card-link">
              Read More <i class="bi bi-arrow-right"></i>
            </a>
          </div>
        </article>
      </div>
    `).join('');

    section.classList.remove('d-none');
  }

  // ===========================================
  // UI FUNCTIONS
  // ===========================================

  /**
   * Show loading state
   */
  function showLoading() {
    const loading = document.getElementById('article-loading');
    const error = document.getElementById('article-error');
    const content = document.getElementById('article-content');
    const related = document.getElementById('related-posts-section');

    if (loading) loading.classList.remove('d-none');
    if (error) error.classList.add('d-none');
    if (content) content.classList.add('d-none');
    if (related) related.classList.add('d-none');
  }

  /**
   * Show error state
   */
  function showError() {
    const loading = document.getElementById('article-loading');
    const error = document.getElementById('article-error');
    const content = document.getElementById('article-content');
    const related = document.getElementById('related-posts-section');

    if (loading) loading.classList.add('d-none');
    if (error) error.classList.remove('d-none');
    if (content) content.classList.add('d-none');
    if (related) related.classList.add('d-none');
  }

  /**
   * Show content
   */
  function showContent() {
    const loading = document.getElementById('article-loading');
    const error = document.getElementById('article-error');
    const content = document.getElementById('article-content');

    if (loading) loading.classList.add('d-none');
    if (error) error.classList.add('d-none');
    if (content) content.classList.remove('d-none');
  }

  // ===========================================
  // EVENT HANDLERS
  // ===========================================

  /**
   * Handle copy link button
   */
  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      // Show toast
      const toastEl = document.getElementById('copy-toast');
      if (toastEl) {
        const toast = new bootstrap.Toast(toastEl);
        toast.show();
      }
    }).catch(err => {
      console.error('Failed to copy link:', err);
      alert('Link: ' + window.location.href);
    });
  }

  /**
   * Handle sidebar search
   * @param {Event} e - Submit event
   */
  function handleSidebarSearch(e) {
    e.preventDefault();
    const input = document.getElementById('sidebar-search-input');
    if (input && input.value.trim()) {
      window.location.href = `blog.html?search=${encodeURIComponent(input.value.trim())}`;
    }
  }

  // ===========================================
  // INITIALIZATION
  // ===========================================

  /**
   * Cache DOM elements
   */
  function cacheElements() {
    elements.copyBtn = document.getElementById('share-copy');
    elements.searchForm = document.getElementById('sidebar-search-form');
  }

  /**
   * Bind event listeners
   */
  function bindEvents() {
    // Copy link button
    if (elements.copyBtn) {
      elements.copyBtn.addEventListener('click', handleCopyLink);
    }

    // Sidebar search form
    if (elements.searchForm) {
      elements.searchForm.addEventListener('submit', handleSidebarSearch);
    }
  }

  /**
   * Initialize the page
   */
  async function init() {
    // Only run on blog single page
    if (!document.querySelector('.blog-single-page')) return;

    cacheElements();
    bindEvents();
    showLoading();

    try {
      // Get post ID from URL
      const postId = getUrlParam('id');
      if (!postId) {
        showError();
        return;
      }

      // Fetch all posts
      state.allPosts = await fetchAllPosts();

      // Get current post
      state.currentPost = getPostById(postId);
      if (!state.currentPost) {
        showError();
        return;
      }

      // Render everything
      renderArticle(state.currentPost);
      renderRecentPosts();
      renderCategoryCounts();
      renderRelatedPosts(state.currentPost);

      // Show content
      showContent();

      // Refresh AOS
      if (typeof AOS !== 'undefined') {
        AOS.refresh();
      }

    } catch (error) {
      console.error('Error initializing blog single page:', error);
      showError();
    }
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();