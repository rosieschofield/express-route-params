import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Try a more interesting route...",
  });
});

app.get("/eat/apple", (req, res) => {
  res.json({
    message: "Yum yum - you ate an apple!",
  });
});

app.get("/eat/banana", (req, res) => {
  res.json({
    message: "Yum yum - you ate a banana!",
  });
});

app.get("/eat/carrot", (req, res) => {
  res.json({
    message: "Yum yum - you ate a carrot!",
  });
});

app.get("/echo/:exampleRouteParameter", (req, res) => {
  const echoContent = req.params.exampleRouteParameter;
  res.json({
    echo: echoContent,
    message: `I am echoing back to you: ${echoContent}`,
  });
});

app.get<{ shoutable: string }>("/shout/:shoutable", (req, res) => {
  const shoutIt = req.params.shoutable;
  res.json({
    shout: shoutIt,
    result: `I am shouting back to you: ${shoutIt}!`,
  });
});

app.get<{ numOne: number; numTwo: number }>(
  "/multiply/:numOne/:numTwo",
  (req, res) => {
    /**
     * Note that `numOne` and `numTwo` are both typed as string.
     * (Hover over with your mouse to see!)
     *
     * Route params are, by default, typed as strings when they
     * are parsed by Express.
     */
    const { numOne, numTwo } = req.params;
    const multiplication = numOne * numTwo;
    //const multiplication = parseInt(numOne) * parseInt(numTwo);
    res.json({
      original: `${numOne} x ${numTwo}`,
      result: multiplication,
    });
  }
);

app.get("/add/:numOne/:numTwo/:numThree?", (req, res) => {
  const addition = req.params.numThree
    ? parseInt(req.params.numOne) +
      parseInt(req.params.numTwo) +
      parseInt(req.params.numThree)
    : parseInt(req.params.numOne) + parseInt(req.params.numTwo);
  res.json({
    original: req.params.numThree
      ? `${req.params.numOne} + ${req.params.numTwo} + ${req.params.numThree}`
      : `${req.params.numOne} + ${req.params.numTwo}`,
    result: addition,
  });
});

app.get<{ food: string }>("/eat/:food", (req, res) => {
  const prefix = req.params.food.match(/^[aeiou]/) ? "an" : "a";
  res.json({
    message: `Yum yum - you ate ${prefix} ${req.params.food}!`,
  });
});

/**
 * `app.get` can take a type argument.
 *
 *  This could be the name of an existing type (e.g. an interface)
 *    or a literal object type that is provided directly, as below.
 */
app.get<{ name: string }>("/happy-birthday/:name", (req, res) => {
  res.json({
    lyrics: [
      "Happy birthday to you",
      "Happy birthday to you",
      /**
       * The type argument stops us from, e.g., the silly typo
       * of `req.params.namw` - try it, and see!
       */
      `Happy birthday dear ${req.params.name}`,
      "Happy birthday to you!",
    ],
  });
});

// using 4000 by convention, but could be changed
const PORT_NUMBER = 5050;

app.listen(PORT_NUMBER, () => {
  console.log(`Server is listening on ${PORT_NUMBER}`);
});
