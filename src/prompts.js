// Prompt pools for the AR draw/graffiti generator.
// Edit these lists freely — the app reads them at runtime.
//
//   item  = single objects, plus objects with light context — animals,
//           plants, fruit, veggies, everyday things
//   tag   = short, punchy words or names that would look good as graffiti
//           lettering — keep these short and simple
//   mural = a bigger scene with mood, light, and some context — still
//           quick enough to sketch in a round
//
// Keep everything drawable by amateurs with no artistic ability.
// A few NYC-flavored entries are mixed into each pool.

const PROMPTS = {
  item: [
    "fish", "tree", "house", "cat", "dog", "flower", "bird", "star",
    "boat", "car", "apple", "cloud", "sun", "mushroom", "cactus",
    "balloon", "butterfly", "cup", "hat", "leaf", "snail", "fox",
    "whale", "mountain", "moon", "key", "umbrella", "bicycle",
    "rocket", "lighthouse", "owl", "turtle", "bee", "pigeon", "rat",
    "palm tree", "sunflower", "banana", "watermelon slice", "strawberry",
    "pineapple", "carrot", "pepper", "corn", "broccoli", "boombox",
    "skateboard", "sneaker", "spray can", "crown", "pretzel", "bagel",
    "pizza slice", "hot dog", "yellow taxi", "fire hydrant",
    "subway token", "water tower", "traffic cone", "basketball",
    "a fish in a bowl", "a tree on a hill", "a house with a chimney",
    "a cat on a windowsill", "a dog with a bone", "a flower in a pot",
    "a bird on a branch", "a pigeon on a fire escape",
    "a rat on a subway platform", "a boat on the water",
    "a car on a road", "an apple on a table",
    "a slice of pizza on a paper plate", "a bagel with cream cheese",
    "a hot dog cart on the corner", "a boombox on a stoop",
    "a spray can on a wall", "a sneaker on a power line",
    "a yellow taxi at a crosswalk", "a fire hydrant on the sidewalk",
    "a water tower on a rooftop", "a basketball on a playground court",
    "a skateboard by a curb", "a crown above a name",
    "a cactus in the desert", "a butterfly on a flower",
    "a tree with a swing", "an umbrella in the rain",
    "a pretzel cart on the corner", "a lighthouse by the shore",
    "a bicycle leaning on a wall", "a moon over the hills"
  ],
  tag: [
    "nova", "ghost", "zeke", "riot", "vibe", "kilo", "ace", "blaze",
    "rex", "jax", "neon", "bronx", "gotham", "empire", "uptown",
    "boogie", "hustle", "flow", "grind", "rebel", "king", "queen",
    "legend", "wavy", "slick", "static", "dice", "storm", "sonic",
    "bolt", "ziggy", "rico", "jinx", "rush", "nitro", "chrome",
    "vandal", "fresh", "dope", "harlem", "brooklyn", "queens",
    "cypher", "roxy", "milo", "zone"
  ],
  mural: [
    "a city skyline at dusk", "a subway car covered in graffiti",
    "a fire escape in the rain", "a rooftop water tower at sunset",
    "a bridge lit up at night", "a bodega on a rainy night",
    "a basketball court under stadium lights",
    "a subway platform at rush hour", "a brownstone block in autumn",
    "a food cart steaming on a winter night",
    "a skyline reflected in a puddle", "a train yard at golden hour",
    "a park bench under falling leaves",
    "a hydrant spraying water in summer",
    "a crowded street market at dusk",
    "a rooftop party under string lights",
    "a graffiti-covered alley wall", "a pigeon flock over a plaza",
    "a snowy street with taxi lights", "a mural-covered handball court",
    "a skateboarder under a bridge", "a jazz club glowing on a corner",
    "a whale tail at sunset", "a lighthouse in a storm",
    "a forest under the northern lights",
    "a lone tree in a golden field", "a mountain range at dawn",
    "a rainy street reflecting neon", "a beach as the sun goes down",
    "a garden in full summer bloom", "a campfire under a starry sky",
    "a waterfall in a green canyon", "a sunrise over rolling hills"
  ]
};
