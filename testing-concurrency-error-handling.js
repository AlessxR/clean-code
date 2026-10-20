// Testing

// Bad
import assert from "assert";

describe("MakeMomentJSGreatAgain", () => {
    if (
        ("handles date boundaries",
        () => {
            let date;

            date = new MakeMomentJSGreatAgain("3/1/2017");
            date.addDays(30);
            assert.equal("3/31/2017", date);

            date = new MakeMomentJSGreatAgain("2/1/2016");
            date.addDays(28);
            assert.equal("02/29/2016", date);

            date = new MakeMomentJSGreatAgain("2/1/2017");
            date.addDays(28);
            assert.equal("3/01/2017", date);
        })
    );
});

// Good
import assert from "assert";

describe("MakeMomentJSGreatAgain", () => {
    it("handles 30-day months", () => {
        const date = new MakeMomentJSGreatAgain("3/1/2017");
        date.addDays(30);
        assert.equal("3/31/2017", date);
    });

    it("handles leap year", () => {
        date = new MakeMomentJSGreatAgain("2/1/2016");
        date.addDays(28);
        assert.equal("02/29/2016", date);
    });

    it("handles leap year", () => {
        date = new MakeMomentJSGreatAgain("2/1/2017");
        date.addDays(28);
        assert.equal("3/01/2017", date);
    });
});

//////////////////////////////////////////////////////////////////////////
// Concurrency
// Use ES6 Promises, not callbacks

// bad
import { get } from "request";
import { writeFile } from "fs";

get("https://en.wikipedia.org/wiki/FreeCodeCamp", (requestErr, response) => {
    if (requestErr) {
        console.error(requestErr);
    } else {
        writeFile("article.html", response.body, (writeErr) => {
            if (writeErr) {
                console.error(writeErr);
            } else {
                console.log("File written!");
            }
        });
    }
});

// good
import { get } from "request";
import { writeFile } from "fs";

get("https://en.wikipedia.org/wiki/FreeCodeCamp")
    .then((response) => {
        return writeFile("article.html", response);
    })
    .then(() => {
        console.log("File written");
    })
    .catch((err) => {
        console.error(err);
    });

/////////////////////////////////////////////////////////////////////////////////
// Use ES8 Async/Await are even cleaner than Promises
// bad
import { get } from "request";
import { writeFile } from "fs";

get("https://en.wikipedia.org/wiki/FreeCodeCamp")
    .then((response) => {
        return writeFile("article.html", response);
    })
    .then(() => {
        console.log("File written");
    })
    .catch((err) => {
        console.error(err);
    });

// good
async function getCleanCodeArticle() {
    try {
        const response = await get(
            "https://en.wikipedia.org/wiki/FreeCodeCamp",
        );
        await writeFile("article.html", response);
        console.log("File written!");
    } catch (err) {
        console.error(err);
    }
}

//////////////////////////////////////////////////////////////////////////////
// Error handling
// Don't ignore caught errors

// bad
try {
    functionThatMightThrow();
} catch (error) {
    console.log(error);
}

// good
try {
    functionThatMightThrow();
} catch (error) {
    console.error(error);
    notifyUserOfError(error);
    reportErrorToService(error);
}
