//////////////////////////////////////
// S - Single Responsibility Principle
// Bad

class UserSettings {
    constructor(user) {
        this.user = user;
    }

    changeSettings(settings) {
        if (this.verifyCredentials()) {
            // ...
        }
    }

    verifyCredentials() {
        // ...
    }
}

// Good

class UserAuth {
    constructor(user) {
        this.user = user;
    }

    verifyCredentials() {
        // ...
    }
}

class UserSettings {
    constructor(user) {
        this.user = user;
        this.auth = new UserAuth(user);
    }

    changeSettings(settings) {
        if (this.auth.verifyCredentials()) {
            // ...
        }
    }
}

//////////////////////////////////////////////////////////////////
// O - Open/Closed Principle
// Bad
var iceCreamFlavors = ["chocolate", "vanilla"];
var iceCreamMaker = {
    makeIceCream(flavor) {
        if (iceCreamFlavors.indexOf(flavor) > -1) {
            console.log("Great success. You now have ice cream.");
        } else {
            console.log("Epic fail. No ice cream for you");
        }
    },
};

export default iceCreamMaker;

// Good
var iceCreamFlavors = ["chocolate", "vanilla"];
var iceCreamMaker = {
    makeIceCream(flavor) {
        if (iceCreamFlavors.indexOf(flavor) > -1) {
            console.log("Great success. You now have ice cream.");
        } else {
            console.log("Epic fail. No ice cream for you");
        }
    },

    addFlavor(flavor) {
        iceCreamFlavors.push(flavor);
    },
};

////////////////////////////////////////////////////////////////
// L - Liskov Substitution Principle
// Bad

class Rectangle {
    constructor() {
        this.width = 0;
        this.height = 0;
    }

    setColor(color) {
        // ...
    }

    render(area) {
        // ...
    }

    setWidth(width) {
        this.width = width;
    }

    setHeight(height) {
        this.height = height;
    }

    getArea() {
        return this.width * this.height;
    }
}

class Square extends Rectangle {
    setWidth(width) {
        this.width = width;
        this.height = this.height;
    }

    setHeight(height) {
        this.width = height;
        this.height = height;
    }
}

function renderLargeRectangles(rectangles) {
    rectangles.forEach((rectangle) => {
        rectangle.setWidth(4);
        rectangle.setHeight(5);
        const area = rectangle.getArea(); // bad
        rectangle.render(area);
    });
}

const rectangles = [new Rectangle(), new Rectangle(), new Square()];
renderLargeRectangles(rectangles);

// Good

class Shape {
    setColor(color) {
        // ...
    }

    render(area) {
        // ...
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }

    getArea() {
        return this.width * this.height;
    }
}

class Square extends Shape {
    constructor(length) {
        super();
        this.length = length;
    }

    getArea() {}
}

/////////////////////////////////////////////////////////
// I - Interface Segregation Principle
// bad

class DOMTraverser {
    constructor(settings) {
        this.settings = settings;
        this.setup();
    }

    setup() {
        this.rootNode = this.settings.rootNode;
        this.animationModule.setup();
    }

    traverse() {
        // ...
    }
}

const $ = new DOMTraverser({
    rootNode: document.getElementsByTagName("body"),
    animationModule() {}, // most of the time we won't need to animate when traversing
    // ...
});

// good

class DOMTraverser {
    constructor(settings) {
        this.settings = settings;
        this.options = settings.options;
        this.setup();
    }

    setup() {
        this.rootNode = this.settings.rootNode;
        this.setupOptions();
    }

    setupOptions() {
        if (this.options.animationModule) {
            // ...
        }
    }

    traverse() {
        // ...
    }
}

const $_ = new DOMTraverser({
    rootNode: document.getElementsByTagName("body"),
    options: {
        animationModule() {},
    },
});

//////////////////////////////////////////////////////////////////////////////
// D - Dependency Inversion Principle
// Bad

class InventoryRequester {
    constructor() {
        this.REQ_METHODS = ["HTTP"];
    }

    requestItem(item) {
        // ...
    }
}

class InventoryTracker {
    constructor(items) {
        this.items = items;

        // bad
        this.requester = new InventoryRequester();
    }

    requestItem() {
        this.items.forEach((item) => {
            this.requester.requestItem(item);
        });
    }
}

const inventoryTracker = new InventoryTracker(["apples", "bananas"]);
inventoryTracker.requestItem();

// Good

class InventoryTracker {
    constructor(items, requester) {
        this.items = items;
        this.requester = requester;
    }

    requestItems() {
        this.items.forEach((item) => {
            this.requester.requestItem(item);
        });
    }
}

class InventoryRequesterV1 {
    constructor() {
        this.REQ_METHODS = ["HTTP"];
    }

    requestItem(item) {
        // ...
    }
}

class InventoryRequesterV2 {
    constructor() {
        this.REQ_METHODS = ["WS"];
    }

    requestItem(item) {
        // ...
    }
}

const inventoryTracker1 = new InventoryTracker(
    ["apples", "bananas"],
    new InventoryRequesterV2(),
);
inventoryTracker1.requestItem();
