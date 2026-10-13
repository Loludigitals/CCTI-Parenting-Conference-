// Conference Data for CCTI Annual Virtual Parenting Conference 3.0

export interface Speaker {
  id: string;
  name: string;
  title: string;
  role?: string;
  bio: string;
  topic: string;
  image: string;
  sessions: string[];
  badges: string[];
}

export interface ScheduleDay {
  day: string;
  date: string;
  morning: {
    time: string;
    theme: string;
    description: string;
    speakers: string[];
  };
  evening: {
    time: string;
    theme: string;
    description: string;
    speakers: string[];
    isHighlight?: boolean;
  };
}

export const CONVENER_DATA = {
  name: 'Mary Omotosho',
  title: 'President & Founder, Christian Children Training Institute (CCTI)',
  roles: ['Minister', 'Educator', 'Author', 'Music Minister', 'Family Life Counselor'],
  image: '/src/assets/images/convener_mary_omotosho_1791818990667.jpg',
  quote: 'To raise generations of walking Bibles: purpose-driven children and teens who live by God\'s Word, influence their communities and positively impact their nations.',
  personalMessage: 'Dear mother, your story matters. Your sacrifices matter. Your growth matters. And your wellbeing matters, too. Behind many smiling mothers are untold stories of silent battles and hidden tears. For these four days, you will not be condemned—you will be heard, held, loved, and revived.',
  credentials: [
    {
      category: 'Education',
      details: 'B.Sc. Computer Science (Health Information Management), Lead City University.',
    },
    {
      category: 'Theological & Ministry',
      details: 'School of Biblical Studies, MFM Prayer City. Certified in Christ-Centered Education & Children Ministers Training.',
    },
    {
      category: 'Counseling & Family',
      details: 'Marriage Counseling, Child Mental Health, and Purpose Coaching for Christian Families.',
    },
  ],
  books: [
    {
      title: 'My Mom Is a Blessing to Me',
      subtitle: 'Nurturing gratitude, honor, and godliness in the young heart.',
      status: 'Published',
    },
    {
      title: 'Season of the Rising of the Watcher',
      subtitle: 'Prophetic intercession strategies for praying mothers.',
      status: 'Available as E-Book',
    },
    {
      title: "Mothers Awake",
      subtitle: 'A trumpet call to mothers in an era of cultural shifting.',
      status: 'Coming Soon',
    },
  ],
  musicMinistry: 'Composer & music minister. Convener of the monthly prophetic gathering "Prophetic Sounds for the Nations".',
};

export const INITIAL_SPEAKERS: Speaker[] = [
  {
    id: 'eucharia-okolie',
    name: 'Dcns Eucharia M. Okolie',
    title: 'Minister of the Gospel & Family Mentor',
    role: 'Children & Family Ministry Leader',
    bio: 'Dcns Eucharia brings decades of godly wisdom on family cohesion, emotional healing for mothers, and practical biblical disciplines for home training.',
    topic: 'Healing the Mother\'s Heart: Releasing Guilt and Walking in Divine Peace',
    sessions: ['Thu 15 Oct (Morning)', 'Fri 16 Oct (Evening)'],
    badges: ['Family Discipleship', 'Emotional Restoration'],
    image: '/src/assets/images/regenerated_image_1791824563168.png',
  },
  {
    id: 'leyemso-ahindi',
    name: 'Deaconess Mrs Leyemso Ahindi',
    title: 'CEO, Turkei Ama Aroma Restaurant & Christian Mentor',
    role: 'Kingdom Entrepreneur & Motherhood Advocate',
    bio: 'A passionate businesswoman and godly mother who inspires women to balance career, enterprise, and building a prayer-fueled sanctuary at home.',
    topic: 'Balancing Calling, Enterprise, and the Nurturing of Godly Heirs',
    sessions: ['Fri 16 Oct (Morning)', 'Sat 17 Oct (Evening)'],
    badges: ['Kingdom Marketplace', 'Home Management'],
    image: '/src/assets/images/regenerated_image_1791824553746.jpg',
  },
  {
    id: 'olu-akinyanju-blessing',
    name: 'Engr Olu-Akinyanju Blessing',
    title: 'Professional Engineer & Youth Mentor',
    role: 'Childhood Character Architect',
    bio: 'Engr Blessing combines engineering precision with spiritual insight on laying unshakeable biblical foundations in the formative years of children.',
    topic: 'Building Unshakeable Foundations: Character Architecture in Early Childhood',
    sessions: ['Thu 15 Oct (Evening)', 'Sat 17 Oct (Morning)'],
    badges: ['Character Building', 'Youth Development'],
    image: '/src/assets/images/regenerated_image_1791826077835.png',
  },
  {
    id: 'dedayo-gbolagun',
    name: 'Dedayo Gbolagun',
    title: 'Founder, Mom on Fire Global',
    role: 'Prophetic Intercessor for Mothers',
    bio: 'Convener of Mom on Fire Global, Dedayo has stirred thousands of women across continents to stand in prayer over their children\'s destinies.',
    topic: 'The Watchman Mother: Prophetic Intercession and Spiritual Covering Over Your Seed',
    sessions: ['Fri 16 Oct (Evening)', 'Sun 18 Oct (Morning)'],
    badges: ['Intercessory Prayer', 'Spiritual Warfare'],
    image: '/src/assets/images/regenerated_image_1791824555283.jpg',
  },
  {
    id: 'oluwatoyin-odeleye',
    name: 'Rev. Dr. Mrs Oluwatoyin Odeleye',
    title: 'Foursquare Gospel Church, Omoluabi District Headquarters',
    role: 'Senior Minister & Pastoral Counselor',
    bio: 'Rev. Dr. Odeleye is a revered teacher of the Word with deep apostolic grace on family restoration, marriage reconciliation, and generational blessings.',
    topic: 'Generational Blessings: Breaking Negative Family Patterns and Reclaiming the Heritage',
    sessions: ['Sat 17 Oct (Morning)', 'Sun 18 Oct (Morning)'],
    badges: ['Biblical Exegesis', 'Family Deliverance'],
    image: '/src/assets/images/regenerated_image_1791824557525.png',
  },
  {
    id: 'david-olarinioye',
    name: 'Dr David Olarinioye',
    title: 'Medical Consultant & Christian Educator',
    role: 'Family Health & Child Development Specialist',
    bio: 'Dr David integrates medical science, child psychology, and Christian ethics to provide comprehensive guidance for total child wellbeing.',
    topic: 'The Total Child: Nurturing Mental Health, Physical Wellbeing, and Spiritual Vigor',
    sessions: ['Thu 15 Oct (Morning)', 'Sat 17 Oct (Evening)'],
    badges: ['Child Health', 'Mental Wellness'],
    image: '/src/assets/images/regenerated_image_1791826947898.png',
  },
];

export const SCHEDULE_DATA: ScheduleDay[] = [
  {
    day: 'Thursday',
    date: '15th October 2026',
    morning: {
      time: '10:00 AM – 12:00 Noon (WAT / GMT+1)',
      theme: 'The Awakening: Unveiling the Divine Purpose of Motherhood',
      description: 'Foundational plenary on God\'s eternal blueprint for the mother\'s heart. Understanding the high calling behind daily caregiving.',
      speakers: ['Dcns Eucharia M. Okolie', 'Dr David Olarinioye'],
    },
    evening: {
      time: '7:00 PM – 9:00 PM (WAT / GMT+1)',
      theme: 'Laying the Bedrock: Character & Discipline without Bitterness',
      description: 'Practical training on training children in love, biblical boundary setting, and building mutual trust from tender age.',
      speakers: ['Engr Olu-Akinyanju Blessing', 'Mary Omotosho'],
    },
  },
  {
    day: 'Friday',
    date: '16th October 2026',
    morning: {
      time: '10:00 AM – 12:00 Noon (WAT / GMT+1)',
      theme: 'The Wellspring: Managing Emotional Fatigue and Maternal Burnout',
      description: 'A deep session of inner healing, soul renewal, and strategies for mothers who feel overwhelmed, invisible, or weary.',
      speakers: ['Deaconess Mrs Leyemso Ahindi', 'Mary Omotosho'],
    },
    evening: {
      time: '7:00 PM – 9:00 PM (WAT / GMT+1)',
      theme: 'Midnight Cry: The Interceding Mother & Shielding the Next Generation',
      description: 'A high-powered prophetic prayer and warfare session against cultural pollutants, addictions, and destiny hijackers.',
      speakers: ['Dedayo Gbolagun', 'Dcns Eucharia M. Okolie'],
    },
  },
  {
    day: 'Saturday',
    date: '17th October 2026',
    morning: {
      time: '10:00 AM – 12:00 Noon (WAT / GMT+1)',
      theme: 'Generational Healing: Overcoming Trauma and Rebuilding Broken Altars',
      description: 'Dealing with generational baggage, forgiving past parenting mistakes, and restoring joy in the Christian home.',
      speakers: ['Rev. Dr. Mrs Oluwatoyin Odeleye', 'Engr Olu-Akinyanju Blessing'],
    },
    evening: {
      time: '7:00 PM – 9:00 PM (WAT / GMT+1)',
      theme: 'Raising Walking Bibles: Practical Discipleship in a Digital Age',
      description: 'Mastering technology, screen-time balance, Bible memory, and mentoring digital native kids toward Christlike convictions.',
      speakers: ['Dr David Olarinioye', 'Deaconess Mrs Leyemso Ahindi'],
    },
  },
  {
    day: 'Sunday',
    date: '18th October 2026',
    morning: {
      time: '10:00 AM – 12:00 Noon (WAT / GMT+1)',
      theme: 'Anointing of the Mother: Prophetic Impartation for the Journey Ahead',
      description: 'Final teaching and consecration service. Prophetic declarations over mothers, pregnant women, and aspiring mothers.',
      speakers: ['Mary Omotosho', 'Rev. Dr. Mrs Oluwatoyin Odeleye'],
    },
    evening: {
      time: '7:00 PM – 9:30 PM (WAT / GMT+1)',
      theme: 'Grand Gala: Mother\'s Appreciation & National Awards Ceremony',
      description: 'Celebration of sacrificial motherhood, special musical presentations, award citations, testimonies, and fellowship.',
      speakers: ['All Speakers & Special Guests'],
      isHighlight: true,
    },
  },
];

export const CORE_PILLARS = [
  {
    number: '01',
    title: 'Discover',
    lead: 'The Heart & Divine Purpose',
    description: 'Look past the frantic everyday tasks and uncover the profound, eternal reason God entrusted lives into your hands.',
  },
  {
    number: '02',
    title: 'Heal & Restore',
    lead: 'A Safe Haven Free of Condemnation',
    description: 'Release maternal guilt, past regrets, and unspoken exhaustion. Receive forgiveness, peace, and fresh unconditional love.',
  },
  {
    number: '03',
    title: 'Revive',
    lead: 'Fresh Fire for the Journey',
    description: 'Refill your depleted emotional and spiritual cup with life-giving scriptural insight, worship, and prophetic clarity.',
  },
  {
    number: '04',
    title: 'Inspire',
    lead: 'Actionable Tools for Your Home',
    description: 'Walk away with practical family systems, prayer blueprints, and character-building practices that transform everyday life.',
  },
];

export const TARGET_AUDIENCE = [
  { label: 'Mothers', desc: 'Biological, adoptive, spiritual, and foster mothers at all stages.' },
  { label: 'Mothers-to-be', desc: 'Expecting and waiting mothers preparing their hearts for motherhood.' },
  { label: 'Grandmothers', desc: 'Patriarchs and mentors passing down generational righteousness.' },
  { label: 'Fathers & Husbands', desc: 'Men eager to understand, support, and co-labor with their wives.' },
  { label: 'Guardians & Caregivers', desc: 'Anyone providing daily guidance and protection to children.' },
  { label: 'Teachers & Educators', desc: 'School teachers and mentors shaping impressionable young minds.' },
  { label: 'Children\'s Ministers', desc: 'Sunday school teachers and pastors raising the next generation.' },
  { label: 'Youth Counselors', desc: 'Leaders mentoring teenagers through identity and purpose.' },
];
