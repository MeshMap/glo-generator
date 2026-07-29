// Curated "fun holiday" data for the Events prompt mode, in the spirit of
// timeanddate.com/holidays/fun — hand-picked, not exhaustive.
//
//   daily    = fixed-date fun/notable holidays, keyed "MM-DD"
//   monthly  = month-long observances, keyed "MM" (array, can be several)
//   fallback = a generic idea group used on days with no other match
//
// Each entry has a "title" (the holiday/observance name) and an "ideas"
// array of a few drawable variants — regenerating on the same date keeps
// the title but rotates through the ideas, so it doesn't feel stuck.
//
// Only fixed-calendar dates are included (no "3rd Thursday of..." style
// holidays, since those can't be looked up by a plain MM-DD key).
// Edit, correct, or extend freely — read at runtime, no rebuild needed.

const HOLIDAYS = {
  daily: {
    "01-01": { title: "New Year's Day", ideas: ["a firework bursting into a spray-paint splash", "a clock hand spinning into confetti", "a champagne glass fizzing with stars"] },
    "01-04": { title: "National Trivia Day", ideas: ["a lightbulb with a question mark inside", "a brain wearing a graduation cap", "a stack of question marks piled like blocks"] },
    "01-08": { title: "National Bubble Bath Day", ideas: ["a bathtub overflowing with cloud-shaped bubbles", "a rubber duck floating on a bubble raft", "a bar of soap sliding across a puddle"] },
    "01-11": { title: "National Milk Day", ideas: ["a glass of milk wearing a mustache", "a carton of milk mid-pour into a cloud", "a cow silhouette splashing in a milk puddle"] },
    "01-15": { title: "National Hat Day", ideas: ["a hat tossed mid-air like a graduation cap", "a top hat balanced on a spray can", "a beanie with a paint-drip pattern"] },
    "01-21": { title: "National Hug Day", ideas: ["two arms wrapped around a big heart", "a bear hugging a smaller heart-shaped bear", "two hands linking into a heart shape"] },
    "01-24": { title: "National Peanut Butter Day", ideas: ["a spoon dripping peanut butter like paint", "a jar of peanut butter with a drippy smile", "a slice of bread wearing a peanut-butter cape"] },
    "01-28": { title: "Data Privacy Day", ideas: ["a padlock sitting on top of a laptop", "a shield made of binary code", "a key guarding a glowing screen"] },
    "01-29": { title: "National Puzzle Day", ideas: ["a jigsaw piece floating out of a puzzle", "two puzzle pieces shaking hands", "a half-finished puzzle with a bird flying out of the gap"] },
    "02-01": { title: "National Freedom Day", ideas: ["a key breaking open a heart-shaped chain link", "a bird flying free from an open cage", "a chain link snapping into a ribbon"] },
    "02-02": { title: "Groundhog Day", ideas: ["a groundhog peeking out of a hole, casting a shadow", "a groundhog holding an umbrella against its own shadow", "a sleepy groundhog in a burrow full of stars"] },
    "02-04": { title: "World Cancer Day", ideas: ["a ribbon wrapped gently around a heart", "a candle glowing beside a ribbon", "two hands cupping a ribbon-shaped light"] },
    "02-09": { title: "National Pizza Day", ideas: ["a pizza slice wearing sunglasses", "a pizza box springing open like a jack-in-the-box", "a slice of pizza doing a skateboard trick"] },
    "02-11": { title: "National Inventors Day", ideas: ["a lightbulb with tiny gears inside it", "a robot arm holding a wrench", "a blueprint rolling into a lightbulb shape"] },
    "02-13": { title: "World Radio Day", ideas: ["a boombox blasting visible sound waves", "an old radio with an antenna shaped like a lightning bolt", "a microphone wrapped in sound-wave rings"] },
    "02-14": { title: "Valentine's Day", ideas: ["a heart with a lightning-bolt crack through it", "an arrow piercing a heart made of roses", "two hearts locking together like puzzle pieces"] },
    "02-17": { title: "Random Acts of Kindness Day", ideas: ["a heart-shaped balloon floating free", "a hand passing a flower to another hand", "a heart wrapped like a gift with a bow"] },
    "02-20": { title: "World Day of Social Justice", ideas: ["a raised fist inside a circle", "a scale balancing a heart and a star", "hands linking together in a circle"] },
    "02-22": { title: "National Margarita Day", ideas: ["a margarita glass wearing a lime-wedge hat", "a salt-rimmed glass with a tiny umbrella", "a blender splashing margarita like a wave"] },
    "03-01": { title: "National Pig Day", ideas: ["a pig wearing a tiny crown", "a pig with wings mid-flight", "a piglet splashing in a heart-shaped mud puddle"] },
    "03-03": { title: "World Wildlife Day", ideas: ["a tiger face made out of leaves", "an elephant silhouette filled with stars", "a wolf howling at a leaf-shaped moon"] },
    "03-08": { title: "International Women's Day", ideas: ["a raised fist holding a flower", "a crown made of flowers", "two hands lifting a rising sun"] },
    "03-14": { title: "Pi Day", ideas: ["a slice of pie with a pi-symbol crust", "a pie chart turned into an actual pie", "a circle unraveling into the pi symbol"] },
    "03-17": { title: "St. Patrick's Day", ideas: ["a four-leaf clover wearing sunglasses", "a pot of gold spilling stars instead of coins", "a rainbow arching over a top hat"] },
    "03-20": { title: "International Day of Happiness", ideas: ["a smiling sun wearing sunglasses", "a balloon shaped like a smiley face", "a jumping figure trailing confetti"] },
    "03-21": { title: "World Poetry Day", ideas: ["a quill dripping ink into a heart", "an open book with words floating up like birds", "a feather turning into a paper airplane"] },
    "03-22": { title: "World Water Day", ideas: ["a water droplet wearing a tiny crown", "a wave curling around a single leaf", "a droplet splashing into heart-shaped ripples"] },
    "03-30": { title: "National Doctors' Day", ideas: ["a stethoscope wrapped around a heart", "a heart with a bandage and a small cape", "a medical cross glowing like a star"] },
    "04-01": { title: "April Fools' Day", ideas: ["a jester hat balanced on a spray can", "a whoopee cushion mid-bounce", "a mask laughing while hiding a wink"] },
    "04-07": { title: "World Health Day", ideas: ["a heart wearing a stethoscope", "a heart lifting a small dumbbell", "a leaf growing out of a heart"] },
    "04-11": { title: "National Pet Day", ideas: ["a paw print inside a heart", "a dog and cat sharing one leash", "a pet collar shaped like a heart tag"] },
    "04-22": { title: "Earth Day", ideas: ["the earth wrapped in climbing vines", "a globe sprouting a single tree", "a leaf shaped like the continents"] },
    "04-23": { title: "World Book Day", ideas: ["an open book with birds flying out of it", "a stack of books shaped like a castle", "a bookmark trailing like a kite string"] },
    "04-26": { title: "World Intellectual Property Day", ideas: ["a lightbulb glowing inside a copyright symbol", "a gear turning into a lightbulb", "a pencil signing its own drawing"] },
    "04-30": { title: "International Jazz Day", ideas: ["a saxophone with musical notes for smoke", "a piano key trailing into music notes", "a trumpet blasting confetti-shaped notes"] },
    "05-01": { title: "May Day", ideas: ["a maypole wrapped in ribbons", "a basket of flowers spilling over", "a ribbon dancer mid-spin"] },
    "05-03": { title: "World Press Freedom Day", ideas: ["a pen breaking through a chain", "a newspaper folding into a paper airplane", "a megaphone shaped like a speech bubble"] },
    "05-04": { title: "Star Wars Day", ideas: ["a lightsaber crossed with a spray can", "a small droid rolling past a star", "a helmet visor reflecting stars"] },
    "05-05": { title: "Cinco de Mayo", ideas: ["a maraca wearing a tiny sombrero", "a cactus wearing a sombrero", "a taco mid-dance with confetti"] },
    "05-08": { title: "World Red Cross Day", ideas: ["a heart with a plus sign inside it", "a bandage wrapped around a small heart", "two hands cupping a red cross symbol"] },
    "05-12": { title: "International Nurses Day", ideas: ["a heart wrapped in a bandage", "a nurse cap sitting on a heart", "a stethoscope forming a heart shape"] },
    "05-15": { title: "International Day of Families", ideas: ["stick figures holding hands under an umbrella", "a house with a heart-shaped window", "a tree with a family of birds nesting in it"] },
    "05-17": { title: "World Telecommunication Day", ideas: ["a satellite dish catching falling stars", "a phone with signal bars shaped like a mountain", "a tin-can telephone stretching between two clouds"] },
    "05-20": { title: "World Bee Day", ideas: ["a bee wearing a flower crown", "a honeycomb dripping like paint", "a bee trailing a flight path shaped like a flower"] },
    "05-25": { title: "Towel Day", ideas: ["a towel flying like a superhero cape", "a beach towel riding a wave", "a rolled-up towel balanced like a trophy"] },
    "05-31": { title: "World No Tobacco Day", ideas: ["a snapped cigarette sprouting a flower", "a lung shape filled with leaves", "an ashtray overflowing with tiny flowers"] },
    "06-01": { title: "Global Day of Parents", ideas: ["two big hands cupping a small heart", "a parent and child silhouette flying a kite", "a nest with one big bird and one small bird"] },
    "06-05": { title: "World Environment Day", ideas: ["a tree growing out of a lightbulb", "a globe wrapped in leaves", "a factory smokestack turning into a flower stem"] },
    "06-08": { title: "World Oceans Day", ideas: ["a wave curling around a fish silhouette", "a jellyfish glowing like a lantern", "a wave shaped like a whale's tail"] },
    "06-14": { title: "World Blood Donor Day", ideas: ["a heart-shaped droplet with tiny wings", "a droplet cupped in two hands", "a heart pulsing like a heartbeat line"] },
    "06-19": { title: "Juneteenth", ideas: ["a rising sun breaking a chain made of vines", "a raised fist wrapped in sunrise colors", "a star bursting out of a broken shackle"] },
    "06-20": { title: "World Refugee Day", ideas: ["a paper boat carrying a small glowing light", "a suitcase sprouting a tiny tree", "a bird carrying a house on its back"] },
    "06-21": { title: "World Music Day", ideas: ["a lotus flower balanced on a boombox", "a guitar with strings made of sound waves", "headphones wrapped around a glowing sun"] },
    "06-27": { title: "PTSD Awareness Day", ideas: ["a candle glowing steady in the dark", "a lighthouse beam cutting through fog", "a hand shielding a small flame"] },
    "07-01": { title: "International Joke Day", ideas: ["a banana peel mid-slip", "a whoopee cushion with a wink", "a clown nose bouncing like a ball"] },
    "07-04": { title: "Independence Day", ideas: ["a firework shaped like a bursting star", "a flag rippling into fireworks", "a sparkler trailing stars across the sky"] },
    "07-07": { title: "World Chocolate Day", ideas: ["a chocolate bar melting like dripping paint", "a chocolate chip cookie with a heart-shaped bite", "a cocoa mug with marshmallow clouds on top"] },
    "07-11": { title: "World Population Day", ideas: ["a globe made of tiny handprints", "a crowd of stick figures forming a heart", "hands of every size linking around the earth"] },
    "07-15": { title: "National Give Something Away Day", ideas: ["a gift box tossed between two hands", "a balloon with a gift tag floating away", "an open hand offering a small star"] },
    "07-17": { title: "World Emoji Day", ideas: ["a spray-painted smiley face", "a thumbs-up emoji with a paint drip", "a heart-eyes emoji made of stars"] },
    "07-20": { title: "Moon Day", ideas: ["a footprint on the moon surrounded by stars", "an astronaut planting a flag on a crescent moon", "a rocket looping around the moon like a ribbon"] },
    "07-30": { title: "International Day of Friendship", ideas: ["two fists bumping with little sparks flying", "two stick figures sharing one umbrella", "two hands forming a bridge shape"] },
    "08-01": { title: "World Wide Web Day", ideas: ["a globe wrapped in cables like vines", "a spiderweb made of glowing wires", "a browser window opening like a curtain"] },
    "08-08": { title: "International Cat Day", ideas: ["a cat mid-jump wearing a tiny cape", "a cat curled into a crescent moon shape", "a cat batting at a ball of yarn shaped like a planet"] },
    "08-09": { title: "International Day of the World's Indigenous Peoples", ideas: ["a feather wrapped in sunbeams", "a feather trailing into a river", "a dreamcatcher glowing like a sun"] },
    "08-12": { title: "International Youth Day", ideas: ["a skateboard mid-air trailing stars", "a paper airplane looping through the sky", "a slingshot launching a shooting star"] },
    "08-15": { title: "National Relaxation Day", ideas: ["a hammock strung between two clouds", "a cup of tea steaming into a spiral", "a lounge chair floating on a calm wave"] },
    "08-19": { title: "World Photography Day", ideas: ["a camera with a rainbow-colored flash", "a camera lens reflecting a tiny sun", "a photo frame with a star peeking out"] },
    "08-26": { title: "Women's Equality Day", ideas: ["a raised fist wrapped in a ribbon", "a scale balancing evenly with two stars", "a crown made of interlocking hands"] },
    "09-05": { title: "International Day of Charity", ideas: ["a heart cradled in open hands", "a basket overflowing with tiny hearts", "a hand planting a heart-shaped seed"] },
    "09-08": { title: "International Literacy Day", ideas: ["an open book turning into a bird", "letters flying off a page like confetti", "a book with a lighthouse beam shining from its pages"] },
    "09-11": { title: "Patriot Day", ideas: ["a candle glowing beside a folded flag", "a dove carrying a small flag", "a skyline silhouette holding a single lit window"] },
    "09-15": { title: "International Day of Democracy", ideas: ["a ballot box with a heart dropping in", "a raised hand next to a checkmark", "a megaphone shaped like a speech bubble with a checkmark"] },
    "09-16": { title: "International Day for the Preservation of the Ozone Layer", ideas: ["an umbrella shielding the earth", "a globe wrapped in a protective bubble", "a sunbeam gently bouncing off a shield"] },
    "09-21": { title: "International Day of Peace", ideas: ["a dove shaped from a peace sign", "an olive branch wrapped around a heart", "two hands releasing a paper dove"] },
    "09-27": { title: "World Tourism Day", ideas: ["a suitcase with a compass sticker", "a passport sprouting airplane wings", "a globe with a pin marking a heart-shaped spot"] },
    "10-01": { title: "International Coffee Day", ideas: ["a coffee cup with heart-shaped steam", "a coffee bean wearing tiny sunglasses", "a mug overflowing with swirling steam clouds"] },
    "10-04": { title: "World Animal Day", ideas: ["a paw print blooming into flowers", "a nest with an egg cracking into a star", "a dog and bird sharing one shadow"] },
    "10-05": { title: "World Teachers' Day", ideas: ["an apple balanced on a stack of books", "a chalkboard with a smiley-face sun drawn on it", "a pencil growing into a small tree"] },
    "10-10": { title: "World Mental Health Day", ideas: ["a brain wrapped gently in a blanket", "a heart resting inside a cloud", "a lighthouse beam calming a stormy wave"] },
    "10-11": { title: "International Day of the Girl Child", ideas: ["a paper airplane shaped like a star", "a girl silhouette holding a balloon shaped like the world", "a crown made of tiny paper stars"] },
    "10-16": { title: "World Food Day", ideas: ["a fork and spoon crossed like swords over a plate", "a steaming bowl with a heart-shaped swirl", "a loaf of bread wearing a tiny chef hat"] },
    "10-24": { title: "United Nations Day", ideas: ["a globe wrapped in a ribbon of little flags", "hands from every direction meeting at a globe", "a dove circling a globe like an orbit"] },
    "10-31": { title: "Halloween", ideas: ["a pumpkin with a crooked grin dripping paint", "a ghost peeking out from behind a spray can", "a bat silhouette flying past a crescent moon"] },
    "11-01": { title: "World Vegan Day", ideas: ["a carrot wearing a superhero cape", "a leaf sprouting from a fork", "a smiling tomato riding a broccoli skateboard"] },
    "11-13": { title: "World Kindness Day", ideas: ["a heart made of interlocking hands", "a hand passing a flower to another hand", "a heart-shaped balloon tied to a doorknob"] },
    "11-16": { title: "International Day for Tolerance", ideas: ["two hands forming a heart shape", "a puzzle piece from one color fitting into another", "two different colored birds sharing one branch"] },
    "11-19": { title: "International Men's Day", ideas: ["a wrench crossed with a paintbrush", "a heart wearing a tie", "a toolbox with a flower growing out of it"] },
    "11-21": { title: "World Television Day", ideas: ["an old TV with a plant growing from the antenna", "a TV screen framing a sunset", "a remote control shaped like a rocket"] },
    "11-29": { title: "Red Planet Day", ideas: ["a rocket landing on Mars planting a flag", "a Mars rover leaving heart-shaped tracks", "a red planet orbited by a single star"] },
    "12-01": { title: "World AIDS Day", ideas: ["a red ribbon with small wings", "a candle glowing beside a red ribbon", "two hands cupping a ribbon-shaped light"] },
    "12-03": { title: "International Day of Persons with Disabilities", ideas: ["a wheelchair wheel turning into a sun", "a cane leaning into a rainbow", "a hand and a hook shaking in friendship"] },
    "12-05": { title: "International Volunteer Day", ideas: ["two hands cupping a small planted seedling", "a heart-shaped watering can", "a tree growing from a single helping hand"] },
    "12-10": { title: "Human Rights Day", ideas: ["a dove holding an olive branch of light", "a raised hand shaped like a sunrise", "a candle surrounded by linked hands"] },
    "12-14": { title: "International Monkey Day", ideas: ["a monkey swinging with a spray can in hand", "a monkey hanging from a vine shaped like a smile", "a monkey mid-swing tossing confetti"] },
    "12-21": { title: "Winter Solstice", ideas: ["a sun peeking through a giant snowflake", "a candle glowing against a snowy window", "a star shining through bare tree branches"] },
    "12-25": { title: "Christmas Day", ideas: ["a string of lights wrapped around a spray can", "a stocking overflowing with stars", "a snow-covered rooftop with a glowing window"] },
    "12-31": { title: "New Year's Eve", ideas: ["a clock striking midnight with confetti bursting out", "a countdown number dissolving into fireworks", "a party hat riding a shooting star"] }
  },

  monthly: {
    "01": [
      { title: "National Blood Donor Month", ideas: ["a heart-shaped droplet with a small cape", "a droplet cupped gently in two hands", "a heart pulsing like a heartbeat line"] }
    ],
    "02": [
      { title: "Black History Month", ideas: ["a raised fist wrapped in stars", "a crown made of stars and stripes", "a torch passing light from one hand to another"] },
      { title: "American Heart Month", ideas: ["a heart wrapped in a stethoscope", "a heart lifting a small dumbbell", "a heart with a heartbeat line trailing like a ribbon"] }
    ],
    "03": [
      { title: "Women's History Month", ideas: ["a raised fist holding a paintbrush", "a crown made of flowers and stars", "a torch held up by a single raised hand"] },
      { title: "National Nutrition Month", ideas: ["an apple wearing a tiny cape", "a plate shaped like a smiling sun", "a carrot doing a victory pose"] }
    ],
    "04": [
      { title: "Earth Month", ideas: ["a globe sprouting fresh leaves", "a tree growing out of a lightbulb", "a leaf shaped like the whole planet"] },
      { title: "National Poetry Month", ideas: ["a quill writing a heart in the air", "words floating up off a page like birds", "an open book glowing like a lantern"] }
    ],
    "05": [
      { title: "Asian American & Pacific Islander Heritage Month", ideas: ["a paper lantern glowing warm light", "a koi fish swimming through clouds", "a fan unfolding into a sunrise"] },
      { title: "Mental Health Awareness Month", ideas: ["a brain wrapped gently in vines", "a heart resting inside a soft cloud", "a lighthouse beam calming a stormy wave"] }
    ],
    "06": [
      { title: "Pride Month", ideas: ["a rainbow-striped heart", "a rainbow flag waving like a cape", "a rainbow arching over two linked hands"] },
      { title: "Great Outdoors Month", ideas: ["a tent glowing under a blanket of stars", "a mountain trail winding into a sunrise", "a backpack sprouting a small tree"] }
    ],
    "07": [
      { title: "Park and Recreation Month", ideas: ["a skateboard mid-air over a park bench", "a frisbee spinning like a small planet", "a picnic blanket covered in floating balloons"] }
    ],
    "08": [
      { title: "National Wellness Month", ideas: ["a lotus flower balanced on a barbell", "a heart taking a deep breath of clouds", "a yoga pose silhouette inside a sunrise"] }
    ],
    "09": [
      { title: "Hispanic Heritage Month", ideas: ["a maraca wrapped in a ribbon flag", "a guitar strumming confetti-colored notes", "a papel picado banner fluttering like wings"] },
      { title: "Suicide Prevention Awareness Month", ideas: ["a candle glowing steady with small wings", "a lighthouse beam cutting through fog", "a hand gently shielding a small flame"] }
    ],
    "10": [
      { title: "Breast Cancer Awareness Month", ideas: ["a pink ribbon with wings", "a candle glowing beside a pink ribbon", "two hands cupping a ribbon-shaped light"] },
      { title: "Hispanic Heritage Month", ideas: ["a maraca wrapped in a ribbon flag", "a guitar strumming confetti-colored notes", "a papel picado banner fluttering like wings"] },
      { title: "LGBT History Month", ideas: ["a rainbow flag waving like a cape", "a rainbow-striped heart", "a torch glowing in every color"] }
    ],
    "11": [
      { title: "Native American Heritage Month", ideas: ["a feather wrapped in sunrise colors", "a dreamcatcher glowing like a sun", "a feather trailing into a river"] },
      { title: "No-Shave November", ideas: ["a mustache made of curling vines", "a beard made of tiny leaves", "a razor resting beside a growing vine"] }
    ],
    "12": [
      { title: "Universal Human Rights Month", ideas: ["a dove made of interlocking hands", "a candle surrounded by linked hands", "a raised hand shaped like a sunrise"] }
    ]
  },

  fallback: {
    title: "",
    ideas: [
      "a paintbrush riding a shooting star",
      "a spray can wearing a tiny party hat",
      "a smiley face made of clouds",
      "a paper airplane looping through confetti",
      "a sneaker mid-jump over a rainbow puddle",
      "a boombox blasting heart-shaped notes",
      "a cat DJing on a turntable",
      "a skateboard doing a trick over a crescent moon",
      "a slice of pizza sunbathing on a beach towel",
      "a balloon animal shaped like a dragon"
    ]
  }
};
