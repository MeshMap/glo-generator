// Prompt pools for the AR draw/graffiti generator.
// Edit these lists freely — the app reads them at runtime.
//
//   easy   = single bare objects
//   medium = an object placed in a small context
//   hard   = an evocative scene with mood and light
//
// Keep everything drawable by amateurs with no artistic ability.

const PROMPTS = {
  easy: [
    "fish", "tree", "house", "cat", "dog", "flower", "bird", "star",
    "boat", "car", "apple", "cloud", "sun", "mushroom", "cactus",
    "balloon", "butterfly", "cup", "hat", "leaf", "snail", "fox",
    "whale", "mountain", "moon", "key", "umbrella", "bicycle",
    "rocket", "lighthouse"
  ],
  medium: [
    "a fish in a bowl", "a tree on a hill", "a house with a chimney",
    "a cat on a windowsill", "a dog with a bone", "a flower in a pot",
    "a bird on a branch", "a boat on the water", "a car on a road",
    "an apple on a table", "a cloud with rain", "a cactus in the desert",
    "a butterfly on a flower", "a snail on a leaf", "a fox in the grass",
    "a whale under the surface", "a mountain with a path",
    "a rocket leaving the ground", "a lighthouse by the shore",
    "a hot air balloon in the sky", "a campfire by a tent",
    "a sailboat at the dock", "a cat chasing a ball",
    "a bird feeding its chicks", "a tree with a swing",
    "a fish swimming past coral", "a house with a garden",
    "a moon over the hills", "an umbrella in the rain",
    "a bicycle leaning on a wall"
  ],
  hard: [
    "a whale tail at sunset", "a lighthouse in a storm",
    "a forest under the northern lights", "a city skyline at dusk",
    "a lone tree in a golden field", "a boat drifting on a calm sea",
    "a mountain range at dawn", "a rainy street reflecting neon",
    "a beach as the sun goes down", "a fox in a snowy forest",
    "a garden in full summer bloom", "a campfire under a starry sky",
    "a bird soaring over cliffs", "a quiet harbor at first light",
    "a meadow in the morning mist", "a river winding through a valley",
    "a desert under a full moon", "a cat curled up by a window in winter",
    "a field of flowers in the wind", "a sailboat racing the sunset",
    "a waterfall in a green canyon", "a village rooftop view at golden hour",
    "a forest path in autumn", "a whale breaching the open ocean",
    "a hillside town lit up at night", "a stormy sky over the sea",
    "a lantern-lit street at dusk", "a snowy mountain cabin",
    "a coral reef bathed in light", "a sunrise over rolling hills"
  ]
};
