/**
 * Authentic South Indian Telugu Gruhapravesam Centralized Configuration
 * ======================================================================
 * MASTER CONFIGURATION: Bonam Family Gruhapravesam
 * Hosts: B. Ramanjaneyulu, B. Lakshmi Kumari
 * Ceremony Date: 26-11-2026 | Muhurtham: 08:00 PM
 * Venue: Mangalaguntapalem, Rusthumbada, Narsapuram, Andhra Pradesh
 * Maps: 16.446154, 81.655852 | WhatsApp: +91 6300599958
 */

import { enTranslations } from './translations/en.js';
import { teTranslations } from './translations/te.js';

// Primary Centralized Family & Event Configuration
const familyConfig = {
  surname: "Bonam Family",
  surnameTelugu: "బోనం",
  hostNames: ["Sri B. Ramanjaneyulu", "Smt. B. Lakshmi Kumari"],
  hostNamesTelugu: ["శ్రీ బి. రామాంజనేయులు", "శ్రీమతి బి. లక్ష్మీ కుమారి"],
  familyMembers: ["Bonam Family Members", "Relatives & Well-Wishers"],
  familyMembersTelugu: ["బోనం కుటుంబ సభ్యులు", "బంధుమిత్రులు"],
  invitationBy: "Bonam Family",
  invitationByTelugu: "బోనం వారి కుటుంబ సభ్యులు"
};

const eventConfig = {
  date: "2026-11-26",
  dateFormatted: "Thursday, 26th November 2026",
  teluguDate: "శ్రీ విశ్వావసు నామ సంవత్సరం • కార్తీక బహుళ తదియ • గురువారం",
  day: "Thursday",
  teluguDay: "గురువారం",
  muhurtham: "08:00 PM",
  muhurthamTime: "08:00 PM",
  ganapathiPooja: "06:30 PM",
  vastuPooja: "07:15 PM",
  satyanarayanaVratham: "08:45 PM",
  lunch: "09:30 PM onwards", // Traditional Dinner Feast
  targetDate: "2026-11-26T20:00:00",
  nakshatram: "Mrigasira Nakshatram (మృగశిర నక్షత్రం)",
  lagnam: "Mithuna Lagnam (మిథున లగ్నం)"
};

const venueConfig = {
  name: "Bonam Family Residence",
  teluguName: "బోనం వారి నూతన నివాసం",
  address: "Mangalaguntapalem, Rusthumbada",
  teluguAddress: "మంగళగుంటపాలెం, రుస్తుంబాద",
  landmark: "Rusthumbada, Narsapuram",
  teluguLandmark: "రుస్తుంబాద, నరసాపురం సమీపంలో",
  city: "Narsapuram",
  state: "Andhra Pradesh",
  pincode: "534275",
  googleMapsUrl: "https://maps.google.com/?q=16.446154,81.655852",
  googleMapsDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=16.446154,81.655852",
  googleMapsEmbedUrl: "https://www.google.com/maps?q=16.446154,81.655852&hl=en&z=15&output=embed",
  landmarksHelp: [
    "Rusthumbada Center (రుస్తుంబాద సెంటర్ సమీపంలో)",
    "Mangalaguntapalem Road (మంగళగుంటపాలెం మెయిన్ రోడ్డు)",
    "Dedicated parking assistance available for all guests"
  ]
};

const contactConfig = {
  primaryName: "Sri B. Ramanjaneyulu",
  primaryNameTelugu: "శ్రీ బి. రామాంజనేయులు",
  primaryPhone: "+91 6300599958",
  whatsappNumber: "916300599958"
};

const settingsConfig = {
  defaultLanguage: "te",
  enableMusic: true,
  enableCountdown: true,
  enableGallery: true
};

export const gruhapravesamConfig = {
  // 1. Mandatory Centralized Configuration Fields
  family: familyConfig,
  event: eventConfig,
  venue: venueConfig,
  contact: contactConfig,
  settings: settingsConfig,

  // 2. Traditional Opening Slokas & Devotional Invocations
  slokas: {
    primary: "|| శ్రీ గణేశాయ నమః ||",
    secondary: "|| శ్రీ వేంకటేశ్వరాయ నమః ||",
    shubhamastu: "|| శుభమస్తు ||",
    subtext: "శుభమస్తు • అవిఘ్నమస్తు • శ్రీరస్తు",
    openingPlaqueTitle: "శుభ గృహప్రవేశ ఆహ్వానం",
    openingPlaqueSubtitle: "You Are Cordially Invited",
    openButtonText: "తలుపులు తెరవండి | Open Invitation",
    closingSloka: "|| సర్వే జనాః సుఖినో భవంతు ||",
    sanatanaBlessing: "ఓం శ్రీ మాత్రే నమః • ఓం నమో వేంకటేశాయ"
  },

  // 3. Main Telugu Invitation
  teluguInvitation: {
    invocation: "శ్రీ గణేశాయ నమః",
    opening: "భగవంతుని ఆశీస్సులతో మరియు పెద్దల ఆశీర్వాదాలతో మా నూతన గృహంలోకి అడుగుపెడుతున్న శుభసందర్భంగా నిర్వహించు",
    title: "శ్రీ గృహప్రవేశ మహోత్సవానికి",
    subtitle: "నూతన గృహప్రవేశ శుభ ఆహ్వాన పత్రిక",
    message: "మీరు మరియు మీ కుటుంబ సభ్యులు విచ్చేసి మీ అమూల్యమైన ఆశీస్సులు అందించి మా ఆనందాన్ని మరింత రెట్టింపు చేయవలసిందిగా మనస్ఫూర్తిగా ఆహ్వానిస్తున్నాము.",
    closing: "ఇట్లు,",
    signoff: `${familyConfig.surnameTelugu} వారి కుటుంబ సభ్యులు`,
    compliments: "శుభాకాంక్షలతో:"
  },

  // 4. Main English Invitation
  englishInvitation: {
    invocation: "|| SRI GANESHAYA NAMAHA ||",
    opening: "With the divine blessings of the Almighty and our elders, we are delighted to invite you and your family to the auspicious occasion of our Gruhapravesam ceremony.",
    title: "GRUHAPRAVESAM CEREMONY",
    subtitle: "SRI GRUHAPRAVESA MAHOTSAVAM",
    message: "As we step into our new home and begin a beautiful new chapter, your gracious presence and blessings will make this celebration truly memorable.",
    closing: "With Warm Regards,",
    signoff: `${familyConfig.surname}`,
    compliments: "With Best Compliments From:"
  },

  // 5. Structured Family Hierarchy (Bridged from familyConfig)
  familyDetails: {
    familySurname: familyConfig.surname,
    familySurnameTelugu: familyConfig.surnameTelugu,
    familySurnameFull: `${familyConfig.surnameTelugu} వంశీయులు (${familyConfig.surname})`,
    
    hosts: {
      title: "Gruhapravesam Hosts",
      teluguTitle: "గృహప్రవేశ ఆహ్వానకర్తలు",
      names: "Sri B. Ramanjaneyulu & Smt. B. Lakshmi Kumari",
      teluguNames: "శ్రీ బి. రామాంజనేయులు & శ్రీమతి బి. లక్ష్మీ కుమారి",
      relation: "Cordially invite you with loving family"
    },

    fatherName: "Sri B. Ramanjaneyulu",
    fatherNameTelugu: "శ్రీ బి. రామాంజనేయులు",
    motherName: "Smt. B. Lakshmi Kumari",
    motherNameTelugu: "శ్రీమతి బి. లక్ష్మీ కుమారి",

    grandparents: {
      hasGrandparents: true,
      title: "With the Blessings of Grandparents & Elders",
      teluguTitle: "పెద్దల & గురుజనుల ఆశీస్సులతో",
      names: "With the Blessings of Elders & Ancestors",
      teluguNames: "కుటుంబ పెద్దల మరియు గురుజనుల ఆశీస్సులతో",
      role: "Elders (కుటుంబ పెద్దలు)"
    },

    children: {
      names: familyConfig.familyMembers.join(", "),
      teluguNames: familyConfig.familyMembersTelugu.join(", ")
    },

    familyMembers: familyConfig.familyMembers.map((member, idx) => ({
      name: member,
      teluguName: familyConfig.familyMembersTelugu[idx] || member,
      role: idx === 0 ? "Family (కుటుంబ సభ్యులు)" : "Relatives (బంధుమిత్రులు)"
    })),

    welcomeNoteTelugu: "మా చిరకాల స్వప్నమైన ఈ గృహాన్ని భక్తి, ప్రేమ మరియు ఆత్మీయతలతో నిర్మించుకున్నాము. మీ పాదధూళితో మా ఇల్లు పావనమగును గాక.",
    welcomeNoteEnglish: "We have built this dream home with devotion, warmth, and love. Your cherished presence will illuminate our new journey with divine joy."
  },

  // 6. Home Details (Bridged from venueConfig)
  home: {
    name: venueConfig.name,
    teluguName: venueConfig.teluguName,
    villaNumber: venueConfig.address,
    tagline: "An Abode of Peace, Prosperity & Joy",
    teluguTagline: "సుఖశాంతులు మరియు సమృద్ధి నిలయము"
  },

  // 7. Venue Bridge
  venue: {
    ...venueConfig,
    fullAddress: `${venueConfig.address}, ${venueConfig.landmark}, ${venueConfig.city}, ${venueConfig.state} ${venueConfig.pincode}`,
    teluguFullAddress: `${venueConfig.teluguAddress}, ${venueConfig.teluguLandmark}, ${venueConfig.city}, ${venueConfig.state} ${venueConfig.pincode}`
  },

  // 8. Event Schedule Bridge
  event: {
    ...eventConfig,
    schedule: [
      {
        id: "ganapathi-pooja",
        title: "Ganapathi Pooja & Dwara Pooja",
        teluguTitle: "గణపతి పూజ & ద్వార తోరణ పూజ",
        time: eventConfig.ganapathiPooja,
        description: "Invocation of Lord Vighneswara and threshold purification with Pasupu, Kumkuma, and Mango leaf thoranam.",
        teluguDescription: "విఘ్నేశ్వర ఆరాధన, ద్వార తోరణ ధారణ మరియు గడపకు పసుపు-కుంకుమల పవిత్ర అర్చన.",
        icon: "Door",
        highlight: false
      },
      {
        id: "vastu-pooja",
        title: "Vastu Pooja & Ksheera Pongadam",
        teluguTitle: "వాస్తు పూజ & పాలు పొంగించడం",
        time: eventConfig.vastuPooja,
        description: "Sanctification of directions, Vastu Shanti homam, and auspicious milk boiling ritual in a brass vessel.",
        teluguDescription: "వాస్తు హోమం, దిక్పాలక పూజ మరియు నూతన ఇత్తడి పాత్రలో పాలు పొంగించే శుభ కార్యం.",
        icon: "Flame",
        highlight: false
      },
      {
        id: "gruhapravesam",
        title: "Gruhapravesam Muhurtham",
        teluguTitle: "శుభ గృహప్రవేశ ముహూర్తం",
        time: eventConfig.muhurtham,
        description: "Auspicious first entry into the home carrying the sacred Kalasham and Kamadhenu at 8:00 PM.",
        teluguDescription: "గోమాత ప్రవేశం, మంగళ కలశంతో రాత్రి 08:00 గంటల సుముహూర్తమున నూతన గృహప్రవేశం.",
        icon: "Sparkles",
        highlight: true
      },
      {
        id: "satyanarayana-vratham",
        title: "Sri Satyanarayana Swamy Vratham",
        teluguTitle: "శ్రీ సత్యనారాయణ స్వామి వ్రతం",
        time: eventConfig.satyanarayanaVratham,
        description: "Vedic story recital and gratitude worship of Lord Satyanarayana Swamy for health and family harmony.",
        teluguDescription: "గృహ శాంతి, ఆయురారోగ్యాల కొరకు భక్తిశ్రద్ధలతో శ్రీ సత్యనారాయణ స్వామి వ్రతం.",
        icon: "HeartHandshake",
        highlight: false
      },
      {
        id: "lunch",
        title: "Prasadam & Traditional Festive Dinner Feast",
        teluguTitle: "తీర్థప్రసాదం & విందు భోజనం",
        time: eventConfig.lunch,
        description: "Maha Mangala Harathi followed by a lavish traditional South Indian dinner feast served with devotion.",
        teluguDescription: "మహా మంగళ హారతి అనంతరం సాంప్రదాయ అరిటాకులో షడ్రసోపేత విందు భోజనం.",
        icon: "Utensils",
        highlight: true
      }
    ]
  },

  // 9. Traditional Decorative Showcases
  decorativeShowcases: [
    {
      id: "banana-mango",
      title: "Banana Trees & Mango Leaf Thoranam",
      teluguTitle: "అరటి చెట్లు & మామిడాకు తోరణం",
      image: "/images/banana-mango-decor.jpg",
      description: "Banana trees with fruit bunches symbolize perpetual fertility, family lineage growth, and eternal abundance. Fresh mango leaves (*Mamidaku*) absorb negative energies and invite auspicious vibrations (*Mangala Tejas*) to the threshold.",
      teluguDescription: "అరటి చెట్లు వంశాభివృద్ధికి, అఖండ సమృద్ధికి ప్రతీక. పచ్చని మామిడాకులు దుష్టశక్తులను నివారించి, గడప వద్దకు లక్ష్మీ కటాక్షాన్ని ఆహ్వానిస్తాయి.",
      significance: "Symbol of Eternal Prosperity & Welcoming Deities",
      teluguSignificance: "అఖండ ఐశ్వర్యం & దేవతా స్వాగత చిహ్నం"
    },
    {
      id: "brass-deepam",
      title: "Traditional Brass Deepam (Kuthu Vilakku)",
      teluguTitle: "సాంప్రదాయ కుత్తు విళక్కు / మంగళ దీపం",
      image: "/images/brass-deepam.jpg",
      description: "The oil lamp dispels darkness, ignorance, and negative influences. Adorned with fragrant jasmine strands, the five golden wicks illuminate the five natural elements (Pancha Bhoothas) with divine grace.",
      teluguDescription: "జ్యోతిర్బిందువు అజ్ఞానాంధకారాన్ని పారద్రోలి జ్ఞానాన్ని, తేజస్సును ప్రసాదిస్తుంది. మల్లెపూలతో అలంకరించిన పంచముఖ దీపాలు పంచభూతాలను పవిత్రం చేస్తాయి.",
      significance: "Dispeller of Darkness & Embodiment of Goddess Lakshmi",
      teluguSignificance: "తమసోమా జ్యోతిర్గమయ - లక్ష్మీ స్వరూపం"
    },
    {
      id: "pooja-kalasham",
      title: "Sacred Pooja Kalasham",
      teluguTitle: "మంగళ కలశం & కొబ్బరికాయ",
      image: "/images/pooja-kalasham.jpg",
      description: "Filled with holy water, consecrated with turmeric and kumkum, crowned with five mango leaves and an unhusked coconut, the Kalasham represents the universe and seat of all cosmic deities during Gruhapravesam.",
      teluguDescription: "పుణ్యతీర్థ జలములతో నిండి, పసుపు-కుంకుమల అలంకరణతో, పంచ పల్లవములు మరియు పూర్ణఫలమైన కొబ్బరికాయతో కూడిన కలశం సకల దేవతల నివాసస్థానం.",
      significance: "Abode of Trimurthis & Ashta Lakshmis",
      teluguSignificance: "సకల దేవతా సాన్నిధ్యం & పూర్ణఫలం"
    },
    {
      id: "muggu-rangoli",
      title: "Threshold Muggu / Rangoli",
      teluguTitle: "సిరి చుక్కల ముగ్గు & పూల రంగోలి",
      image: "/images/traditional-muggu.jpg",
      description: "Drawn lovingly by hand using white rice flour (*Biyyam Pindi*) and natural turmeric-kumkuma, the sacred geometric Muggu welcomes Mother Lakshmi and feeds small birds and creatures, fulfilling Bhuta Yajna.",
      teluguDescription: "బియ్యపు పిండితో గడప ముందు వేసే రంగవల్లులు లక్ష్మీదేవికి స్వాగతం పలుకుతాయి. పసుపు, కుంకుమ మరియు తాజా పూల రేకులతో అలంకరించిన ముగ్గులు ఇంటికి శోభను తెస్తాయి.",
      significance: "Sacred Geometry & Daily Welcome to Mahalakshmi",
      teluguSignificance: "మహాలక్ష్మీ ఆగమనం & భూతయజ్ఞ ప్రతీక"
    },
    {
      id: "flowers-garlands",
      title: "Marigold & Jasmine Floral Garlands",
      teluguTitle: "బంతి & మల్లె పూల అలంకరణ",
      image: "/images/traditional-entrance.jpg",
      description: "Vibrant yellow and saffron marigolds represent the golden light of the sun and spiritual energy, while delicate white jasmine blooms (*Malle Poolu*) spread divine fragrance, peace, and serenity.",
      teluguDescription: "పసుపు-నారింజ బంతిపూలు సూర్యతేజస్సును మరియు ఆధ్యాత్మిక చైతన్యాన్ని సూచిస్తాయి. సుగంధ భరితమైన మల్లెపూలు మనస్సుకు ప్రశాంతతను, పవిత్రతను చేకూరుస్తాయి.",
      significance: "Golden Sun Energy, Purity & Festive Fragrance",
      teluguSignificance: "సూర్యతేజస్సు, పవిత్రత & మంగళ సుగంధం"
    }
  ],

  // 10. Traditional Guest Welcome Details
  guestWelcome: {
    slokaBadge: "|| సుస్వాగతం ||",
    headingTelugu: "హృదయపూర్వక స్వాగతం",
    headingEnglish: "A Warm Welcome to Our New Home",
    description: "We are delighted to welcome you and your family to share our happiness and celebrate this auspicious occasion with us.",
    descriptionTelugu: "మా నూతన గృహప్రవేశ మహోత్సవంలో మా ఆనందాన్ని పంచుకోవడానికి మీ సకుటుంబ సమేతంగా విచ్చేయవలసిందిగా సాదరంగా ఆహ్వానిస్తున్నాము.",
    closingBlessingTelugu: "మీ రాకతో మా ఇంటి ఆనందం మరింత రెట్టింపు అవుతుంది. మీ ఆశీస్సులతో మా కొత్త ఇంటి ప్రయాణం శుభప్రదంగా ప్రారంభం కావాలని కోరుకుంటున్నాము.",
    closingBlessingEnglish: "Your presence and blessings will make our new home even more special."
  },

  // 11. Guest Travel & Transit Information (Narsapuram, West Godavari)
  travelInfo: {
    title: "Guest Travel Information",
    teluguTitle: "అతిథుల ప్రయాణ & రవాణా మార్గదర్శనం",
    nearestRailway: {
      station: "Narasapur Railway Station (NS) / Palakollu (PKO)",
      teluguStation: "నరసాపురం రైల్వే స్టేషన్ (NS) / పాలకొల్లు (PKO)",
      description: "Direct train connectivity from Vijayawada, Hyderabad, and Visakhapatnam. Auto-rickshaws and taxis readily available to Rusthumbada.",
      teluguDescription: "నరసాపురం మరియు పాలకొల్లు రైల్వే స్టేషన్ల నుండి ఆటోలు మరియు టాక్సీల ద్వారా సులభంగా చేరుకోవచ్చు."
    },
    nearestBus: {
      station: "Narsapuram RTC Bus Complex / Rusthumbada Stage",
      teluguStation: "నరసాపురం ఆర్టీసీ బస్ కాంప్లెక్స్ / రుస్తుంబాద స్టేజి",
      description: "Frequent APSRTC buses from Palakollu, Bhimavaram, Tanuku, and local autos to Mangalaguntapalem.",
      teluguDescription: "పాలకొల్లు, భీమవరం, తణుకు నుండి నిరంతరం ఆర్టీసీ బస్సులు మరియు లోకల్ ఆటోలు అందుబాటులో ఉంటాయి."
    },
    nearestAirport: {
      station: "Rajahmundry Airport (RJA) / Vijayawada Airport (VGA)",
      teluguStation: "రాజమండ్రి విమానాశ్రయం (RJA) / విజయవాడ (VGA)",
      description: "Connected via State Highway towards Narsapuram (approx. 2-3 hours drive).",
      teluguDescription: "రాజమండ్రి లేదా విజయవాడ విమానాశ్రయాల నుండి కార్లు / క్యాబ్స్ ద్వారా చేరుకోవచ్చు."
    },
    nearbyLandmarks: [
      "Rusthumbada Main Center (రుస్తుంబాద సెంటర్)",
      "Mangalaguntapalem (మంగళగుంటపాలెం గ్రామం)",
      "Narsapuram Town (నరసాపురం పట్టణ సమీపంలో)"
    ],
    routes: [
      "From Narsapuram Railway Station: Proceed towards Rusthumbada and follow signs to Mangalaguntapalem (approx. 10 mins).",
      "From Palakollu / Bhimavaram: Take main highway to Narsapuram, divert at Rusthumbada towards Mangalaguntapalem."
    ],
    teluguRoutes: [
      "నరసాపురం రైల్వే స్టేషన్ నుండి: రుస్తుంబాద రోడ్డు ద్వారా మంగళగుంటపాలెం చేరుకోండి (10 నిమిషాలు).",
      "పాలకొల్లు / భీమవరం నుండి: ప్రధాన రహదారి ద్వారా రుస్తుంబాద మీదుగా మంగళగుంటపాలెం చేరుకోవచ్చు."
    ]
  },

  // 12. Parking Information & Guidelines
  parkingInfo: {
    title: "Parking Information",
    teluguTitle: "వాహన పార్కింగ్ సమాచారం & సూచనలు",
    status: "Dedicated Parking Available",
    teluguStatus: "ప్రత్యేక పార్కింగ్ సదుపాయం కలదు",
    twoWheeler: "Dedicated two-wheeler parking inside the residential premises and front pavement.",
    teluguTwoWheeler: "ద్విచక్ర వాహనాల కోసం నివాస ప్రాంగణంలో ప్రత్యేక పార్కింగ్ స్థలం కేటాయించబడింది.",
    fourWheeler: "Four-wheeler parking along the wide avenue and designated community area in Mangalaguntapalem.",
    teluguFourWheeler: "కార్ల పార్కింగ్ కొరకు విశాలమైన రోడ్డు మరియు సమీప ప్రాంగణంలో స్థలం కలదు.",
    alternatives: "Parking volunteers will be present to assist guests with smooth parking.",
    teluguAlternatives: "అతిథుల సౌకర్యార్థం పార్కింగ్ సహాయకులు అందుబాటులో ఉంటారు.",
    instructions: "Kindly ensure neighboring pathways remain clear. Follow instructions from the volunteers.",
    teluguInstructions: "దయచేసి ఇరుగుపొరుగు దారులకు అడ్డంకి లేకుండా వాహనాలను నిలపవలసిందిగా మనవి."
  },

  // 13. Detailed Ceremony Schedule with Timings
  ceremonySchedule: [
    {
      time: "05:30 PM onwards",
      teluguTime: "సాయంత్రం 05:30 నుండి",
      name: "Guest Arrival & Suprabhatam",
      teluguName: "అతిథుల రాక & సాదర స్వాగతం",
      description: "Traditional welcome with Mangala Vadyam and fresh flower garlands.",
      icon: "Users"
    },
    {
      time: eventConfig.ganapathiPooja,
      teluguTime: "సాయంత్రం 06:30",
      name: "Ganapathi Pooja & Dwara Pooja",
      teluguName: "గణపతి పూజ & ద్వార తోరణ పూజ",
      description: "Invocation of Lord Ganesha for removal of all obstacles.",
      icon: "Flame"
    },
    {
      time: eventConfig.vastuPooja,
      teluguTime: "రాత్రి 07:15",
      name: "Vastu Pooja & Ksheera Pongadam",
      teluguName: "వాస్తు పూజ & పాలు పొంగించడం",
      description: "Sanctification of directions, Vastu Shanti homam, and auspicious milk boiling ritual in a brass vessel.",
      icon: "Sun"
    },
    {
      time: eventConfig.muhurtham,
      teluguTime: "రాత్రి 08:00 గంటలకు",
      name: "Gruhapravesam Muhurtham",
      teluguName: "శుభ గృహప్రవేశ సుముహూర్తం",
      description: "Sacred threshold entrance carrying sacred Kalasham and Kamadhenu at 8:00 PM.",
      icon: "DoorClosed",
      highlight: true
    },
    {
      time: eventConfig.satyanarayanaVratham,
      teluguTime: "రాత్రి 08:45",
      name: "Sri Satyanarayana Swamy Vratham",
      teluguName: "శ్రీ సత్యనారాయణ స్వామి వ్రతం",
      description: "Sacred Vratham Katha, Mangala Harathi, and distribution of Prasadam.",
      icon: "HeartHandshake"
    },
    {
      time: eventConfig.lunch,
      teluguTime: "రాత్రి 09:30 నుండి",
      name: "Prasadam & Traditional Festive Dinner Feast",
      teluguName: "తీర్థప్రసాదం & సాంప్రదాయ విందు భోజనం",
      description: "Maha Mangala Harathi followed by a lavish traditional South Indian vegetarian dinner feast.",
      icon: "Utensils",
      highlight: true
    }
  ],

  // 14. Host Contacts List
  contacts: [
    {
      name: contactConfig.primaryName,
      teluguName: contactConfig.primaryNameTelugu,
      relation: "Host (గృహ యజమాని)",
      phone: contactConfig.primaryPhone,
      whatsappNumber: contactConfig.whatsappNumber
    },
    {
      name: "Smt. B. Lakshmi Kumari",
      teluguName: "శ్రీమతి బి. లక్ష్మీ కుమారి",
      relation: "Host (గృహ యజమానురాలు)",
      phone: contactConfig.primaryPhone,
      whatsappNumber: contactConfig.whatsappNumber
    }
  ],

  // 15. Admin & Security Configuration
  adminPasscode: "Gruham2026",

  // 16. Section 8 Professional Social Sharing Message
  shareInvitationText: "With immense happiness, we invite you and your family to celebrate the auspicious occasion of our Gruhapravesam.\n\nPlease join us and bless our new home.\n\nWe look forward to welcoming you!\n\nInvitation: ",

  // 17. Background Music Details
  music: {
    title: "Mangala Vadyam & Carnatic Nadaswaram",
    teluguTitle: "మంగళ వాయిద్యం & నాదస్వరం",
    subtext: "Traditional South Indian Auspicious Instrumental",
    raga: "Gambhira Nattai / Kalyani Raga",
    audioSrc: "/audio/traditional-gruhapravesam-nadhaswaram.mp3"
  },

  // 18. Centralized Translations Dictionary
  translations: {
    en: enTranslations,
    te: teTranslations
  }
};

// Aliased export for backward compatibility
export const invitationConfig = gruhapravesamConfig;
export default gruhapravesamConfig;
