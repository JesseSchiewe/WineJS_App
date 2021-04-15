const RedWineDarkFruit = [
    { value: 'Blackberry', label: 'Blackberry', color: 'purple', isFixed: true },
    { value: 'Black Cherry', label: 'Black Cherry', color: 'purple', isFixed: true },
    { value: 'Black Currant', label: 'Black Currant', color: 'purple', isFixed: true },
    { value: 'Plum', label: 'Plum', color: 'purple', isFixed: true },
    { value: 'Blueberry', label: 'Blueberry', color: 'purple', isFixed: true },
    { value: 'Boysenberry', label: 'Boysenberry', color: 'purple', isFixed: true },
];

const RedWineRedFruit = [
    { value: 'Cherry', label: 'Cherry', color: 'red', isFixed: true },
    { value: 'Cranberry', label: 'Cranberry', color: 'red', isFixed: true },
    { value: 'Strawberry', label: 'Strawberry', color: 'red', isFixed: true },
    { value: 'Raspberry', label: 'Raspberry', color: 'red', isFixed: true },
    { value: 'Red Currant', label: 'Red Currant', color: 'red', isFixed: true },
    { value: 'Pomegranate', label: 'Pomegranate', color: 'red', isFixed: true },
    { value: 'Tomato', label: 'Tomato', color: 'red', isFixed: true },
];

const RedWineSpice = [
    { value: 'Black Pepper', label: 'Black Pepper', color: '#858585', isFixed: true },
    { value: 'Anise', label: 'Anise', color: '#858585', isFixed: true },
    { value: 'Licorice', label: 'Licorice', color: '#858585', isFixed: true },
];

const RedWineHerbs = [
    { value: 'Dried Herbs', label: 'Dried Herbs', color: 'green', isFixed: true },
    { value: 'Mint', label: 'Mint', color: 'green', isFixed: true },
    { value: 'Eucalyptus', label: 'Eucalyptus', color: 'green', isFixed: true },
    { value: 'Sage', label: 'Sage', color: 'green', isFixed: true },
];

const RedWineSecondary = [
    { value: 'Leather', label: 'Leather', color: 'orange', isFixed: true },
    { value: 'Mushroom', label: 'Mushroom', color: 'orange', isFixed: true },
    { value: 'Cured Meat', label: 'Cured Meat', color: 'orange', isFixed: true },
    { value: 'Smoke', label: 'Smoke', color: 'orange', isFixed: true },
    { value: 'Graphite', label: 'Graphite', color: 'orange', isFixed: true },
    { value: 'Wet Gravel', label: 'Wet Gravel', color: 'orange', isFixed: true },
    { value: 'Bacon Fat', label: 'Bacon Fat', color: 'orange', isFixed: true },
    { value: 'Toasted Bread', label: 'Toasted Bread', color: 'orange', isFixed: true },
    { value: 'Forest Floor', label: 'Forest Floor', color: 'orange', isFixed: true },
    { value: 'Tar', label: 'Tar', color: 'orange', isFixed: true },
];

const RedWineFlower = [
    { value: 'Potpourri', label: 'Potpourri', color: 'hotpink', isFixed: true },
    { value: 'Dried Flowers', label: 'Dried Flowers', color: 'hotpink', isFixed: true },
    { value: 'Roses', label: 'Roses', color: 'hotpink', isFixed: true },
    { value: 'Violet', label: 'Violet', color: 'hotpink', isFixed: true },
    { value: 'Lavender', label: 'Lavender', color: 'hotpink', isFixed: true },
];

const RedWineOak = [    
    { value: 'Vanilla', label: 'Vanilla', color: 'brown', isFixed: true },
    { value: 'Tobacco', label: 'Tobacco', color: 'brown', isFixed: true },
    { value: 'Coffee', label: 'Coffee', color: 'brown', isFixed: true },
    { value: 'Cocoa', label: 'Cocoa', color: 'brown', isFixed: true },
    { value: 'Dark Chocolate', label: 'Dark Chocolate', color: 'brown', isFixed: true },
    { value: 'Baking Spices', label: 'Baking Spices', color: 'brown', isFixed: true },
    { value: 'Nutmeg', label: 'Nutmeg', color: 'brown', isFixed: true },
    { value: 'Cinnamon', label: 'Cinnamon', color: 'brown', isFixed: true },
    { value: 'Cola', label: 'Cola', color: 'brown', isFixed: true },
    { value: 'Cedar', label: 'Cedar', color: 'brown', isFixed: true },
    { value: 'Brown Sugar', label: 'Brown Sugar', color: 'brown', isFixed: true },
];

const RedWineFaults = [
    { value: 'Stewed Fruit', label: 'Stewed Fruit', color: 'black', isFixed: true },
    { value: 'Vinegar', label: 'Vinegar', color: 'black', isFixed: true },
    { value: 'Wet Newspaper', label: 'Wet Newspaper', color: 'black', isFixed: true },
    { value: 'Burnt Rubber', label: 'Burnt Rubber', color: 'black', isFixed: true },
    { value: 'Metal', label: 'Metal', color: 'black', isFixed: true },
];


export const RedWineFlavorOptions = [
    {
        label: 'Dark Fruit',
        options: RedWineDarkFruit,
        color: 'purple'
    },
    {
        label: 'Red Fruit',
        options: RedWineRedFruit,
        color: 'red'
    },
    {
        label: 'Spice',
        options: RedWineSpice,
        color: '#858585'
    },
    {
        label: 'Herbs',
        options: RedWineHerbs,
        color: 'green'
    },
    {
        label: 'Secondary',
        options: RedWineSecondary,
        color: 'yellow'
    },
    {
        label: 'Flower',
        options: RedWineFlower,
        color: 'hotpink'
    },
    {
        label: 'Oak',
        options: RedWineOak,
        color: 'brown'
    },
    {
        label: 'Faults',
        options: RedWineFaults,
        color: 'black'
    }
]


// const RedWineFlavorsList = [
//     "Cherry",
//     "Strawberry",
//     "Blackberry",
//     "Blackcurrant",
//     "Blueberry"
// ];

// const RedWineFlavors = RedWineFlavorsList.map((category) =>
//     ({label:category,value:category})
// );

//export { RedWineDarkFruit,RedWineRedFruit,RedWineSpice,RedWineHerbs,RedWineSecondary,RedWineFlower,RedWineOak };
