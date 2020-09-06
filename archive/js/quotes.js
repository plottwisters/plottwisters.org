var quotes = [
  {
    quote: "Find out who you are and do it on purpose.",
    person: "Dolly Parton"
  },
  {
    quote: "Life is a dancer, and you are the dance.",
    person: "Eckhart Tolle"
  },
  {
    quote: "The mind is like an umbrella. It's most useful when open.",
    person: "Walter Gropius"
  },
  {
    quote: "We have no firm hold on any knowledge or philosophy that can lift us out of our difficulties.",
    person: "Anne Sullivan"
  },
  {
    quote: "A strenuous effort must be made to train young people to think for themselves and take independent charge of their lives.",
    person: "Anne Sullivan"
  },
  {
    quote: "You think that because you understand 'one' that you must therefore understand 'two,' because one and one make two. But you forget that you must also understand 'and.'",
    person: "Sufi teaching"
  },
  {
    quote: "Without knowledge, action is useless and knowledge without action is futile.",
    person: "Abu Bakr"
  },
  {
    quote: "Without knowledge, action is useless and knowledge without action is futile.",
    person: "Abu Bakr"
  },
  {
    quote: "School is the beginning of the child's life work.",
    person: "Eleanor Roosevelt"
  },
  {
    quote: "Part of the education of every child is to show as many of the various types of lives which make up the world around it.",
    person: "Eleanor Roosevelt"
  },
  {
    quote: "Not everyone can become a great artist, but a great artist can come from anywhere.",
    person: "Pixar's Ratatouille"
  },
  {
    quote: "Fantasy. Lunacy. All revolutions are, until they happen, then they are historical inevitabilities.",
    person: "David Mitchell"
  },
  {
    quote: "Everything you make returns to the Earth as food or poison.",
    person: "Slow Factory"
  },
  {
    quote: "The ultimate, hidden truth of the world is that it is something that we make, and could just as easily make differently.",
    person: "David Graeber"
  },
  {
    quote: "The world is full of magic things, patiently waiting for our senses to grow sharper!",
    person: "William Butler Yeats"
  },
  {
    quote: "A single metaphor can give birth to love.",
    person: "Milan Kundera"
  }
];

$(document).ready(function() {

  var wiseWords = quotes[Math.floor(Math.random()*quotes.length)];
  var quote = wiseWords.quote;
  var person = wiseWords.person;
  $("#quote").html(quote);
  $("#person").html(person);

  $(".refresh").click(function() {
      var wiseWords = quotes[Math.floor(Math.random()*quotes.length)];
      var quote = wiseWords.quote;
      var person = wiseWords.person;
      $("#quote").html(quote);
      $("#person").html(person);
  });
});
