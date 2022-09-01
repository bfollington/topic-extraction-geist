const notes = [
  {
    title: "Evolution",
    body: `
Evolution is a behavior that emerges in any system that has:

1. Mutation
2. Heredity
3. Selection

---

Evolutionary systems often generate unexpected solutions. Nature selects for good enough.

> There is no such thing as advantageous in a general sense. There is only advantageous for the circumstances you’re living in. — [Olivia Judson, Santa Fe Institute](https://overcast.fm/+UtNTAcN2Y/13:36)
`,
    author: "gordonbrander",
  },
  {
    title: "Requisite Variety",
    body: `Ashby’s Law of Requisite Variety:

  > If a system is to be stable, the number of states of its control mechanism must be greater than or equal to the number of states in the system being controlled.
  
  Or:
  
  Only variety can absorb variety.
  
  > Variety is a measure of the number of distinct states a system can be in. For a system to control another system, it needs to have at least as many distinct states as the system being controlled. This is called requisite variety.
  
  Why?
  
  > The amount of output from a system is limited by the variety possible within the system and/or the variety of input to the system. The number of possible alternative communications between the two systems is limited by that system having the fewest output alternatives and/or the fewest input alternatives.
  > Charles E. Osgood
  
  This is more than a design pattern, it is a generalizable law.
  
  ## Two ways to achieve variety

  There are two ways to achieve requisite variety:
  
  - The controlling system increases variety to exceed the system being controlled.
  - The controlling system limits the variety of the system being controlled.

  ## Variety must be embodied

  Knowledge in a system is embodied in the structure of that system. Therefore, the complexity of an adaptive system must match the complexity of that system’s environment.
  
  > If you want to make sense of a complex world, you've got to have an internal system that is equally complex.
  > Karl Weick
  
  ## Limiting variety is authoritarian
  To be authoritarian is to choose methods of control that limit variety.
  
  Any ideology that flattens the complexity of human life down to a simple system will embody less variety than the reality of human experience.
  
  ## Static systems must limit variety to remain stable
  The only way to maintain stability in a static system is by limiting variety. This makes static systems authoritarian.
  
  Even then, the environment will continue changing.
  
  By contrast, living systems are dynamic. They coevolve with the environment, and with the agents that make them up.
  
  Instead of limiting the variety of people, increase the variety of the system.`,
    author: "gordonbrander",
  },
  {
    title: "Beauty, Order, Chaos",
    body: `Perhaps the reason organic patterns are so beautiful is that they straddle the line between order and chaos. we can see there is a pattern, but we cannot directly see that pattern. it’s about reaching the limits of our perception, the reason constraints breed creativity is they constrain the chaos enough to spot a little more order, which we can incorporate and then relax the constraints again. `,
    author: "bfollington",
  },
  {
    title: "Perception of Organic Patterns",
    body: `complex, organic patterns challenge our perceptive models because we cannot reduce them to simple rules based on pure intuition. but, with more experience, we can see more and more of these patterns by manipulating reference frames and perspective. this is why appreciation for art and beauty deepens over a lifetime, our models are be coming richer answers we shift the dividing line of beauty over the horizon. the same is true of scientific understanding. beauty is in the eye of the beholder.`,
    author: "bfollington",
  },
  {
    title: "Programmable attention",
    body: `The review sessions of a Spaced repetition memory system don’t just help you remember things: it orchestrates your repeated attention over time across hundreds of tiny tasks, too many to manage by hand. Systems like these are a form of programmable attention. You use simpler forms of programmable attention all the time: inboxes with snooze and alarm features; bots which remind you of things; Twitter is a kind of programmable attention. What is the core properties of such systems? What is their potential reach?

Such systems are often focused on productivity, but I believe they can be used to support creative work—reading, thinking, expressing, problem-solving.

For more, as applied through spaced repetition: Spaced repetition systems can be used to program attention

This term is evocative, but it has unfortunate connotations of roboticism and alienation. I think I’ll ultimately want to find another.
`,
    author: "andymatuschak",
  },
  {
    title: "Against a Second Brain",
    body: `1. We form complicated beliefs about how the world works, through observations, abstractions (like defining words), model building, and inductive and deductive reasoning
    
    2. Our beliefs and observations come together in a non-linear way

The observation you make today influences your belief about Premise A (I can trust person X to know about Y)

That update cascades to flip decisions or reasoning chains you've formed long in the past (Z is true)

3. That's how things work in your brain -- There is a structure between the thoughts -- the structure resembles something like a graph of nodes and edges with probabilistic weights.

4. We don't put numerical weights on things -- we use words like -- Maybe, Definitely, Probably -- and we feel in our gut something like our probability score for the belief

...
    `,
  },
];

export default notes;
