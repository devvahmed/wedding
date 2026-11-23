// Configuration and Content for the Royal Wedding Invitation
// Customized in natural Roman Urdu exclusively for Hadia Noor from Muhammad Faizan

export const weddingData = {
  // Couple details
  bride: {
    name: "Ayesha Sadiqa",
    fullName: "Ayesha Sadiqa",
    title: "Dulhan",
    photos: [
      "assets/A2.jpeg", // Hero portrait
      "assets/A3.jpeg",
      "assets/A4.jpeg",
      "assets/A5.jpeg",
      "assets/A6.jpeg",
    ],
    fallbackPhoto: "assets/A2.jpeg",
    tagline: "Khushiyon aur duaon bhara naya safar, jald hi shuru hone ja raha hai.",
  },

  groom: {
    name: "Muhammad Faizan",
    fullName: "Muhammad Faizan",
    title: "Dulha",
  },

  // Special Honored Guest & Beloved details (Hadia Noor)
  guest: {
    name: "Hadia Noor",
    salutation: "Meri Pyaari Hadia Noor ❤️",
    heroPhoto: "assets/H1.jpeg",
    personalMessage:
      "Suno Hadia... Tum meri zindagi ka sab se pyara aur khoobsurat hissa ho. Yeh shaadi tumhare baghair bilkul adhuri hai. Maine hamesha har dua mein sirf tumhe manga hai, aur In shaa Allah bohot jald humara apna nikkah hoga aur tum meri dulhan banogi. Aaj ke iss din par tumhari muskurahat mere liye poori duniya hai!",
    shortNote: "Faizan ke dil se, sirf tumhare liye...",
  },

  // The 3 Date Scenes (First Date, Second Date, and Red Dress Dulhan Promise)
  dateScenes: [
    {
      id: "first-date",
      type: "image",
      src: "assets/first-date.jpeg",
      tag: "Scene 1 • First Date",
      title: "Hamari First Date ❤️",
      story:
        "Yaad hai yeh din? Jahan se humara yeh pyara safar shuru hua tha... wo halki si nervousness, wo meethi baatein, aur wo ehsaas ke tum mere liye kitni khaas ho.",
    },
    {
      id: "second-date",
      type: "video",
      src: "assets/second-date.mp4",
      tag: "Scene 2 • Second Date",
      title: "Hamari Second Date ✨",
      story:
        "Yeh humari second date ki video hai... Jab hum dono ko yakeen ho gaya tha ke ab ek doosre ke bina guzara nahi. Tumhari yeh pyaari hansi mere dil mein bas gayi thi!",
    },
    {
      id: "red-dress",
      type: "video",
      src: "assets/HV5.mp4",
      tag: "Scene 3 • Mera Chand",
      title: "Mera Chand in Red Dress 🌹",
      story:
        "Hadia, iss red dress mein tum qayamat lag rahi ho... Aur mera tumse pakka wada raha, In shaa Allah iss se bhi pyare aur khoobsurat lehangay mein main tumhe apni dulhan bana kar ghar laoon ga! ❤️💍",
    },
  ],

  // Extra memories with Hadia (H2, H3, H4, H6)
  memories: [
    {
      id: 1,
      image: "assets/H2.jpeg",
      title: "Tumhari Pyaari Smile",
      caption: "Hadia, tumhari hansi meri poori duniya roshan kar deti hai.",
    },
    {
      id: 2,
      image: "assets/H3.jpeg",
      title: "Humare Khwaab",
      caption: "Pichli pyari yaadon se le kar humare aane wale nikkah ke khwaabon tak.",
    },
    {
      id: 3,
      image: "assets/H4.jpeg",
      title: "Mera Wada",
      caption: "Main hamesha tumhara hath thaam kar chaloon ga, har khushi aur gham mein.",
    },
    {
      id: 4,
      image: "assets/H6.jpeg",
      title: "Agli Baari Humari!",
      caption: "Aaj tum mehman ban ke aa rahi ho, par jald hi tum Faizan ki dulhan banogi In shaa Allah! ❤️",
    },
  ],

  // Music details (YouTube song auto-play)
  music: {
    youtubeId: "S7fvDSjgQPw",
    localAudio: "assets/music.mp3",
    localAudioFallback: "assets/music.webm",
    title: "Romantic Song",
  },

  // Wedding Date & Time
  event: {
    dateDisplay: "Friday, 18 December 2026",
    timeDisplay: "Shaam 07:30 Baje Se",
    targetDateISO: "2026-12-18T19:30:00",
    ceremony: "Baraat & Wedding Celebration",
    venueName: "The Wedding Court",
    venueAddress: "The Wedding Court Event Complex",
    googleMapsLink: "https://maps.app.goo.gl/qnwL2P5mYTPiBnBdA",
  },

  // WhatsApp RSVP details
  rsvp: {
    whatsappNumber: "923001234567",
    prefilledMessage: "Faizan! Tumhari Hadia ne tumhara special card dekh liya. I will definitely be there, and yes... agli baari humari hai! ❤️💍✨",
  },
};
