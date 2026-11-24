/**
 * Centralized Gallery Configuration - Distinct, Unique Photographs
 * ================================================================
 * Curated collection of family portrait, new home architecture,
 * construction milestone, and traditional Gruhapravesam decorations.
 *
 * Categories:
 * - 'family': Our Family (మా కుటుంబం)
 * - 'home': Our New Home (మా నూతన గృహం)
 * - 'moments': Special Moments (మధుర స్మృతులు)
 * - 'decorations': Gruhapravesam Decorations (గృహప్రవేశ అలంకరణలు)
 */

export const galleryCategories = [
  { id: 'all', label: 'All Memories', teluguLabel: 'అన్ని జ్ఞాపకాలు', icon: 'Sparkles' },
  { id: 'family', label: 'Our Family', teluguLabel: 'మా కుటుంబం', icon: 'Users' },
  { id: 'home', label: 'Our New Home', teluguLabel: 'మా నూతన గృహం', icon: 'Home' },
  { id: 'moments', label: 'Special Moments', teluguLabel: 'మధుర స్మృతులు', icon: 'Heart' },
  { id: 'decorations', label: 'Ceremony Decor', teluguLabel: 'గృహప్రవేశ అలంకరణలు', icon: 'Flower2' }
];

export const galleryItems = [
  // --- Category: Our Family ---
  {
    id: 'fam-portrait',
    category: 'family',
    title: 'Bonam Family Festive Portrait',
    teluguTitle: 'బోనం కుటుంబ చిత్రం',
    description: 'The loving Bonam family gathered with immense joy, gratitude, and divine blessings for the auspicious Gruhapravesam milestone.',
    teluguDescription: 'నూతన గృహప్రవేశ శుభవేళ సంప్రదాయ వస్త్రాలలో సకుటుంబంగా బోనం కుటుంబ సభ్యుల మధుర క్షణం.',
    image: '/images/family-portrait.jpg',
    fallbackImage: '/images/home-interior.jpg',
    aspect: 'portrait',
    featured: true,
    date: 'November 2026',
    isPlaceholder: false
  },

  // --- Category: Our New Home ---
  {
    id: 'home-simhadwaram',
    category: 'home',
    title: 'Carved Teakwood Simhadwaram',
    teluguTitle: 'సింహద్వారం & మంగళ గడప',
    description: 'Artisanal solid teakwood main entrance doors with intricate temple carvings, auspicious brass studs, and polished traditional handles.',
    teluguDescription: 'సుందరమైన చెక్కడాలతో కూడిన టేకు చెక్క సింహద్వారం మరియు పసుపు-కుంకుమలతో పూజించబడిన పవిత్ర గడప.',
    image: '/images/carved-teak-door.jpg',
    fallbackImage: '/images/traditional-entrance.jpg',
    aspect: 'portrait',
    featured: true,
    date: 'October 2026',
    isPlaceholder: false
  },
  {
    id: 'home-pooja-mandir',
    category: 'home',
    title: 'Sacred Pooja Mandiram',
    teluguTitle: 'పవిత్ర పూజా మందిరం',
    description: 'The spiritual heart of our home consecrated with carved teak pillars, lit brass deepams, and divine idols for daily worship.',
    teluguDescription: 'ఇంటికి నిండు శోభను, ప్రశాంతతను చేకూర్చే పవిత్ర పూజా మందిరం. నిత్య దీపారాధన మరియు దైవ సంకల్ప స్థలం.',
    image: '/images/pooja-mandir.jpg',
    fallbackImage: '/images/pooja-kalasham.jpg',
    aspect: 'portrait',
    featured: true,
    date: 'November 2026',
    isPlaceholder: false
  },
  {
    id: 'home-living-foyer',
    category: 'home',
    title: 'Sunlit Living Room & Foyer',
    teluguTitle: 'నూతన గృహ ప్రవేశ హాలు',
    description: 'Spacious, warm living room designed to welcome guests with early morning golden sunlight and traditional brass accents.',
    teluguDescription: 'సహజమైన సూర్యకాంతితో, ప్రశాంత వాతావరణంలో బంధుమిత్రులకు స్వాగతం పలికే ప్రధాన హాలు.',
    image: '/images/home-interior.jpg',
    fallbackImage: '/images/home-interior.jpg',
    aspect: 'landscape',
    featured: true,
    date: 'November 2026',
    isPlaceholder: false
  },

  // --- Category: Special Moments ---
  {
    id: 'moment-bhoomi-pooja',
    category: 'moments',
    title: 'Bhoomi Pooja & Foundation Milestone',
    teluguTitle: 'శంకుస్థాపన & భూమి పూజ ఘట్టం',
    description: 'The auspicious day when our elders broke coconuts and consecrated the foundation brick with Vedic chants to begin house construction.',
    teluguDescription: 'వేద మంత్రోచ్ఛారణల మధ్య, పెద్దల సమక్షంలో శాస్త్రోక్తంగా శంకుస్థాపన చేసి ఇంటి నిర్మాణాన్ని ప్రారంభించిన శుభదినం.',
    image: '/images/construction-bhoomi-pooja.jpg',
    fallbackImage: '/images/pooja-kalasham.jpg',
    aspect: 'square',
    featured: true,
    date: 'March 2025',
    isPlaceholder: false
  },
  {
    id: 'moment-paalu-pongadam',
    category: 'moments',
    title: 'Sacred Milk Boiling (Paalu Pongadam)',
    teluguTitle: 'పాలు పొంగించే మంగళకర ఘట్టం',
    description: 'The divine ritual where fresh milk is boiled in an earthen pot until it overflows in the auspicious east direction, heralding endless prosperity.',
    teluguDescription: 'నూతన పొయ్యిపై ఆవుపాలు సమృద్ధిగా పొంగి పొర్లే శుభ ఘట్టం. గృహంలో సిరిసంపదలు, ఆయురారోగ్యాలు నిండాలని చేసే ప్రార్థన.',
    image: '/images/milk-boiling.jpg',
    fallbackImage: '/images/milk-boiling.jpg',
    aspect: 'portrait',
    featured: true,
    date: 'Muhurtham Day',
    isPlaceholder: false
  },

  // --- Category: Gruhapravesam Decorations ---
  {
    id: 'decor-banana-thoranam',
    category: 'decorations',
    title: 'Banana Trees & Mango Leaf Thoranam',
    teluguTitle: 'పచ్చని అరటి బోదెలు & మామిడాకుల తోరణం',
    description: 'Fresh green banana plants flanking the entrance and freshly tied mango leaves welcoming Sri Mahalakshmi into our new abode.',
    teluguDescription: 'గడప ఇరువైపులా పచ్చని అరటి చెట్లు, గుమ్మానికి కట్టిన పచ్చి మామిడాకుల తోరణం నూతన గృహానికి తెచ్చిన పండుగ శోభ.',
    image: '/images/banana-mango-decor.jpg',
    fallbackImage: '/images/banana-mango-decor.jpg',
    aspect: 'landscape',
    featured: true,
    date: 'Ceremony Day',
    isPlaceholder: false
  },
  {
    id: 'decor-traditional-muggu',
    category: 'decorations',
    title: 'Threshold Rice-Flour Muggu (Rangoli)',
    teluguTitle: 'సిరి చుక్కల ముగ్గు & పూల రంగోలి',
    description: 'Intricate white rice-flour geometric patterns decorated with bright turmeric, vermillion kumkuma, and fresh marigold flower petals.',
    teluguDescription: 'బియ్యపు పిండితో ముంగిట్లో వేసిన అందమైన సిరి ముగ్గు, పసుపు-కుంకుమల అలంకరణ మరియు తాజా బంతిపూల రేకులు.',
    image: '/images/traditional-muggu.jpg',
    fallbackImage: '/images/traditional-muggu.jpg',
    aspect: 'square',
    featured: true,
    date: 'Ceremony Day',
    isPlaceholder: false
  },
  {
    id: 'decor-brass-deepams',
    category: 'decorations',
    title: 'Radiant Brass Kuthu Vilakku Lamps',
    teluguTitle: 'మంగళ దీపాలు & దివ్య కాంతులు',
    description: 'Antique multi-tiered brass oil lamps glowing brightly, dispelling darkness and filling the entrance with warm spiritual radiance.',
    teluguDescription: 'ప్రాచీన ఇత్తడి దీపాలు వెలిగించి, గృహమంతా ఆధ్యాత్మిక దివ్య కాంతులతో నిండిన శుభ సందర్భం.',
    image: '/images/brass-deepam.jpg',
    fallbackImage: '/images/brass-deepam.jpg',
    aspect: 'portrait',
    featured: true,
    date: 'Ceremony Day',
    isPlaceholder: false
  },
  {
    id: 'decor-pooja-kalasham',
    category: 'decorations',
    title: 'Sacred Consecrated Kalasham',
    teluguTitle: 'పూర్ణ కలశం & దేవతా ప్రతిష్ట',
    description: 'Filled with holy water, decorated with turmeric-kumkum, crowned with mango leaves and an unhusked coconut, invoking cosmic deities.',
    teluguDescription: 'పంచ పల్లవములు, పవిత్ర తీర్థ జలములు మరియు పూర్ణఫలంతో కూడిన కలశం. సకల దేవతా నివాస ప్రతీక.',
    image: '/images/pooja-kalasham.jpg',
    fallbackImage: '/images/pooja-kalasham.jpg',
    aspect: 'portrait',
    featured: true,
    date: 'Ceremony Day',
    isPlaceholder: false
  }
];
