// Curated "fun holiday" data for the Today prompt mode, in the spirit of
// timeanddate.com/holidays/fun — hand-picked, not exhaustive.
//
//   daily    = fixed-date fun/notable holidays, keyed "MM-DD"
//   monthly  = month-long observances, keyed "MM" (array, can be several)
//   fallback = generic ideas used on days with no other match
//
// Only fixed-calendar dates are included (no "3rd Thursday of..." style
// holidays, since those can't be looked up by a plain MM-DD key).
// Edit, correct, or extend freely — read at runtime, no rebuild needed.

const HOLIDAYS = {
  daily: {
    "01-01": { title: "New Year's Day", idea: "a firework bursting into a spray-paint splash" },
    "01-04": { title: "National Trivia Day", idea: "a lightbulb with a question mark inside" },
    "01-08": { title: "National Bubble Bath Day", idea: "a bathtub overflowing with cloud-shaped bubbles" },
    "01-11": { title: "National Milk Day", idea: "a glass of milk wearing a mustache" },
    "01-15": { title: "National Hat Day", idea: "a hat tossed mid-air like a graduation cap" },
    "01-21": { title: "National Hug Day", idea: "two arms wrapped around a big heart" },
    "01-24": { title: "National Peanut Butter Day", idea: "a spoon dripping peanut butter like paint" },
    "01-28": { title: "Data Privacy Day", idea: "a padlock sitting on top of a laptop" },
    "01-29": { title: "National Puzzle Day", idea: "a jigsaw piece floating out of a puzzle" },
    "02-01": { title: "National Freedom Day", idea: "a key breaking open a heart-shaped chain link" },
    "02-02": { title: "Groundhog Day", idea: "a groundhog peeking out of a hole, casting a shadow" },
    "02-04": { title: "World Cancer Day", idea: "a ribbon wrapped gently around a heart" },
    "02-09": { title: "National Pizza Day", idea: "a pizza slice wearing sunglasses" },
    "02-11": { title: "National Inventors Day", idea: "a lightbulb with tiny gears inside it" },
    "02-13": { title: "World Radio Day", idea: "a boombox blasting visible sound waves" },
    "02-14": { title: "Valentine's Day", idea: "a heart with a lightning-bolt crack through it" },
    "02-17": { title: "Random Acts of Kindness Day", idea: "a heart-shaped balloon floating free" },
    "02-20": { title: "World Day of Social Justice", idea: "a raised fist inside a circle" },
    "02-22": { title: "National Margarita Day", idea: "a margarita glass wearing a lime-wedge hat" },
    "03-01": { title: "National Pig Day", idea: "a pig wearing a tiny crown" },
    "03-03": { title: "World Wildlife Day", idea: "a tiger face made out of leaves" },
    "03-08": { title: "International Women's Day", idea: "a raised fist holding a flower" },
    "03-14": { title: "Pi Day", idea: "a slice of pie with a pi-symbol crust" },
    "03-17": { title: "St. Patrick's Day", idea: "a four-leaf clover wearing sunglasses" },
    "03-20": { title: "International Day of Happiness", idea: "a smiling sun wearing sunglasses" },
    "03-21": { title: "World Poetry Day", idea: "a quill dripping ink into a heart" },
    "03-22": { title: "World Water Day", idea: "a water droplet wearing a tiny crown" },
    "03-30": { title: "National Doctors' Day", idea: "a stethoscope wrapped around a heart" },
    "04-01": { title: "April Fools' Day", idea: "a jester hat balanced on a spray can" },
    "04-07": { title: "World Health Day", idea: "a heart wearing a stethoscope" },
    "04-11": { title: "National Pet Day", idea: "a paw print inside a heart" },
    "04-22": { title: "Earth Day", idea: "the earth wrapped in climbing vines" },
    "04-23": { title: "World Book Day", idea: "an open book with birds flying out of it" },
    "04-26": { title: "World Intellectual Property Day", idea: "a lightbulb glowing inside a copyright symbol" },
    "04-30": { title: "International Jazz Day", idea: "a saxophone with musical notes for smoke" },
    "05-01": { title: "May Day", idea: "a maypole wrapped in ribbons" },
    "05-03": { title: "World Press Freedom Day", idea: "a pen breaking through a chain" },
    "05-04": { title: "Star Wars Day", idea: "a lightsaber crossed with a spray can" },
    "05-05": { title: "Cinco de Mayo", idea: "a maraca wearing a tiny sombrero" },
    "05-08": { title: "World Red Cross Day", idea: "a heart with a plus sign inside it" },
    "05-12": { title: "International Nurses Day", idea: "a heart wrapped in a bandage" },
    "05-15": { title: "International Day of Families", idea: "stick figures holding hands under an umbrella" },
    "05-17": { title: "World Telecommunication Day", idea: "a satellite dish catching falling stars" },
    "05-20": { title: "World Bee Day", idea: "a bee wearing a flower crown" },
    "05-25": { title: "Towel Day", idea: "a towel flying like a superhero cape" },
    "05-31": { title: "World No Tobacco Day", idea: "a snapped cigarette sprouting a flower" },
    "06-01": { title: "Global Day of Parents", idea: "two big hands cupping a small heart" },
    "06-05": { title: "World Environment Day", idea: "a tree growing out of a lightbulb" },
    "06-08": { title: "World Oceans Day", idea: "a wave curling around a fish silhouette" },
    "06-14": { title: "World Blood Donor Day", idea: "a heart-shaped droplet with tiny wings" },
    "06-19": { title: "Juneteenth", idea: "a rising sun breaking a chain made of vines" },
    "06-20": { title: "World Refugee Day", idea: "a paper boat carrying a small glowing light" },
    "06-21": { title: "World Music Day", idea: "a lotus flower balanced on a boombox" },
    "06-27": { title: "PTSD Awareness Day", idea: "a candle glowing steady in the dark" },
    "07-01": { title: "International Joke Day", idea: "a banana peel mid-slip" },
    "07-04": { title: "Independence Day", idea: "a firework shaped like a bursting star" },
    "07-07": { title: "World Chocolate Day", idea: "a chocolate bar melting like dripping paint" },
    "07-11": { title: "World Population Day", idea: "a globe made of tiny handprints" },
    "07-15": { title: "National Give Something Away Day", idea: "a gift box tossed between two hands" },
    "07-17": { title: "World Emoji Day", idea: "a spray-painted smiley face" },
    "07-20": { title: "Moon Day", idea: "a footprint on the moon surrounded by stars" },
    "07-30": { title: "International Day of Friendship", idea: "two fists bumping with little sparks flying" },
    "08-01": { title: "World Wide Web Day", idea: "a globe wrapped in cables like vines" },
    "08-08": { title: "International Cat Day", idea: "a cat mid-jump wearing a tiny cape" },
    "08-09": { title: "International Day of the World's Indigenous Peoples", idea: "a feather wrapped in sunbeams" },
    "08-12": { title: "International Youth Day", idea: "a skateboard mid-air trailing stars" },
    "08-15": { title: "National Relaxation Day", idea: "a hammock strung between two clouds" },
    "08-19": { title: "World Photography Day", idea: "a camera with a rainbow-colored flash" },
    "08-26": { title: "Women's Equality Day", idea: "a raised fist wrapped in a ribbon" },
    "09-05": { title: "International Day of Charity", idea: "a heart cradled in open hands" },
    "09-08": { title: "International Literacy Day", idea: "an open book turning into a bird" },
    "09-11": { title: "Patriot Day", idea: "a candle glowing beside a folded flag" },
    "09-15": { title: "International Day of Democracy", idea: "a ballot box with a heart dropping in" },
    "09-16": { title: "International Day for the Preservation of the Ozone Layer", idea: "an umbrella shielding the earth" },
    "09-21": { title: "International Day of Peace", idea: "a dove shaped from a peace sign" },
    "09-27": { title: "World Tourism Day", idea: "a suitcase with a compass sticker" },
    "10-01": { title: "International Coffee Day", idea: "a coffee cup with heart-shaped steam" },
    "10-04": { title: "World Animal Day", idea: "a paw print blooming into flowers" },
    "10-05": { title: "World Teachers' Day", idea: "an apple balanced on a stack of books" },
    "10-10": { title: "World Mental Health Day", idea: "a brain wrapped gently in a blanket" },
    "10-11": { title: "International Day of the Girl Child", idea: "a paper airplane shaped like a star" },
    "10-16": { title: "World Food Day", idea: "a fork and spoon crossed like swords over a plate" },
    "10-24": { title: "United Nations Day", idea: "a globe wrapped in a ribbon of little flags" },
    "10-31": { title: "Halloween", idea: "a pumpkin with a crooked grin dripping paint" },
    "11-01": { title: "World Vegan Day", idea: "a carrot wearing a superhero cape" },
    "11-13": { title: "World Kindness Day", idea: "a heart made of interlocking hands" },
    "11-16": { title: "International Day for Tolerance", idea: "two hands forming a heart shape" },
    "11-19": { title: "International Men's Day", idea: "a wrench crossed with a paintbrush" },
    "11-21": { title: "World Television Day", idea: "an old TV with a plant growing from the antenna" },
    "11-29": { title: "Red Planet Day", idea: "a rocket landing on Mars planting a flag" },
    "12-01": { title: "World AIDS Day", idea: "a red ribbon with small wings" },
    "12-03": { title: "International Day of Persons with Disabilities", idea: "a wheelchair wheel turning into a sun" },
    "12-05": { title: "International Volunteer Day", idea: "two hands cupping a small planted seedling" },
    "12-10": { title: "Human Rights Day", idea: "a dove holding an olive branch of light" },
    "12-14": { title: "International Monkey Day", idea: "a monkey swinging with a spray can in hand" },
    "12-21": { title: "Winter Solstice", idea: "a sun peeking through a giant snowflake" },
    "12-25": { title: "Christmas Day", idea: "a string of lights wrapped around a spray can" },
    "12-31": { title: "New Year's Eve", idea: "a clock striking midnight with confetti bursting out" }
  },

  monthly: {
    "01": [
      { title: "National Blood Donor Month", idea: "a heart-shaped droplet with a small cape" }
    ],
    "02": [
      { title: "Black History Month", idea: "a raised fist wrapped in stars" },
      { title: "American Heart Month", idea: "a heart wrapped in a stethoscope" }
    ],
    "03": [
      { title: "Women's History Month", idea: "a raised fist holding a paintbrush" },
      { title: "National Nutrition Month", idea: "an apple wearing a tiny cape" }
    ],
    "04": [
      { title: "Earth Month", idea: "a globe sprouting fresh leaves" },
      { title: "National Poetry Month", idea: "a quill writing a heart in the air" }
    ],
    "05": [
      { title: "Asian American & Pacific Islander Heritage Month", idea: "a paper lantern glowing warm light" },
      { title: "Mental Health Awareness Month", idea: "a brain wrapped gently in vines" }
    ],
    "06": [
      { title: "Pride Month", idea: "a rainbow-striped heart" },
      { title: "Great Outdoors Month", idea: "a tent glowing under a blanket of stars" }
    ],
    "07": [
      { title: "Park and Recreation Month", idea: "a skateboard mid-air over a park bench" }
    ],
    "08": [
      { title: "National Wellness Month", idea: "a lotus flower balanced on a barbell" }
    ],
    "09": [
      { title: "Hispanic Heritage Month", idea: "a maraca wrapped in a ribbon flag" },
      { title: "Suicide Prevention Awareness Month", idea: "a candle glowing steady with small wings" }
    ],
    "10": [
      { title: "Breast Cancer Awareness Month", idea: "a pink ribbon with wings" },
      { title: "Hispanic Heritage Month", idea: "a maraca wrapped in a ribbon flag" },
      { title: "LGBT History Month", idea: "a rainbow flag waving like a cape" }
    ],
    "11": [
      { title: "Native American Heritage Month", idea: "a feather wrapped in sunrise colors" },
      { title: "No-Shave November", idea: "a mustache made of curling vines" }
    ],
    "12": [
      { title: "Universal Human Rights Month", idea: "a dove made of interlocking hands" }
    ]
  },

  fallback: [
    { title: "", idea: "a paintbrush riding a shooting star" },
    { title: "", idea: "a spray can wearing a tiny party hat" },
    { title: "", idea: "a smiley face made of clouds" },
    { title: "", idea: "a paper airplane looping through confetti" },
    { title: "", idea: "a sneaker mid-jump over a rainbow puddle" },
    { title: "", idea: "a boombox blasting heart-shaped notes" },
    { title: "", idea: "a cat DJing on a turntable" },
    { title: "", idea: "a skateboard doing a trick over a crescent moon" },
    { title: "", idea: "a slice of pizza sunbathing on a beach towel" },
    { title: "", idea: "a balloon animal shaped like a dragon" }
  ]
};
