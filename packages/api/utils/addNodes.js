const { createId } = require("@paralleldrive/cuid2");
const fs = require("fs");
const nodesFile = "../data/nodes.json";

const nodes = JSON.parse(fs.readFileSync(nodesFile, "utf8"));

const subjects = [
  {
    name: "Humanities",
    description:
      "The humanities are a branch of knowledge that deals with human culture, history, language, literature, philosophy, and the arts. It is an interdisciplinary field that involves critical thinking, analysis, and interpretation of cultural and social phenomena, past and present. The humanities aim to understand and explore the human experience and expression, including its creativity, beliefs, values, and aspirations.",
    parent: "Academy",
  },
  {
    name: "Sciences",
    description:
      "The fields of study that focus on the natural world and its phenomena, using empirical methods to observe, measure, and analyze data in order to better understand the world around us. ",
    parent: "Academy",
  },
  {
    name: "Arts",
    description:
      "The arts is a broad field encompassing creative and cultural expression through various mediums such as visual art, music, literature, theater, film, and dance. The primary purpose of the arts is to evoke an emotional or intellectual response from the audience.",
    parent: "Academy",
  },
  {
    name: "Anthropology",
    description:
      "The study of human societies, cultures, and their development.",
    parent: "Humanities",
  },
  {
    name: "Archaeology",
    description:
      "The study of human history and prehistory through the excavation and analysis of artifacts, structures, and other physical remains.",
    parent: "Humanities",
  },
  {
    name: "Art History",
    description:
      "The study of visual art and its history, including the analysis of style, iconography, and cultural context.",
    parent: "Humanities",
  },
  {
    name: "Astronomy",
    description:
      "The study of celestial objects, such as stars, planets, and galaxies, and the phenomena that occur within the universe.",
    parent: "Sciences",
  },
  {
    name: "Biology",
    description:
      "The study of living organisms and their interactions with the environment.",
    parent: "Sciences",
  },
  {
    name: "Chemistry",
    description:
      "The study of matter, its composition, properties, and interactions with other matter and energy.",
    parent: "Sciences",
  },
  {
    name: "Classics",
    description:
      "The study of the languages, literature, history, art, and other cultural aspects of ancient Greece and Rome.",
    parent: "Humanities",
  },
  {
    name: "Communication Studies",
    description:
      "The study of human communication, including its processes, effects, and social and cultural contexts.",
    parent: "Humanities",
  },
  {
    name: "Computer Science",
    description:
      "The study of computing and information technology, including programming, software engineering, and computer hardware.",
    parent: "Sciences",
  },
  {
    name: "Creative Writing",
    description:
      "The practice of writing stories, poems, and other works of fiction or nonfiction that explore and express the imagination and human experience.",
    parent: "Arts",
  },
  {
    name: "Cultural Studies",
    description:
      "The interdisciplinary study of culture, including its social, political, and historical dimensions, as well as its expressions in media, art, and literature.",
    parent: "Humanities",
  },
  {
    name: "Earth Science",
    description:
      "The study of the physical, chemical, and biological processes that shape the Earth's surface, interior, and atmosphere.",
    parent: "Sciences",
  },
  {
    name: "Economics",
    description:
      "The study of how individuals, organizations, and societies allocate resources and make decisions about production, distribution, and consumption of goods and services.",
    parent: "Humanities",
  },
  {
    name: "Engineering",
    description:
      "The application of scientific and mathematical principles to design, build, and improve machines, structures, and systems for practical purposes.",
    parent: "Sciences",
  },
  {
    name: "English Literature",
    description:
      "The study of literature written in the English language, including poetry, drama, and prose fiction.",
    parent: "Humanities",
  },
  {
    name: "Ethics",
    description:
      "The study of moral principles, values, and decision-making, including the exploration of ethical dilemmas and controversies in various fields.",
    parent: "Humanities",
  },
  {
    name: "Film Studies",
    description:
      "The study of cinema as an art form, including the analysis of film history, theory, and criticism, as well as the production and direction of films.",
    parent: "Arts",
  },
  {
    name: "Fine Arts",
    description:
      "The study and creation of visual and performing arts, including painting, sculpture, music, and theater.",
    parent: "Arts",
  },
  {
    name: "Gender & Sexuality Studies",
    description:
      "The interdisciplinary study of gender and sexuality, including their social, cultural, and political dimensions, as well as their intersections with race, class, and other identity categories.",
    parent: "Humanities",
  },
  {
    name: "History",
    description:
      "History is the study of past events, people, and societies. It involves researching, analyzing, and interpreting the past to better understand the present and anticipate the future.",
    parent: "Humanities",
  },
  {
    name: "Journalism",
    description:
      "Journalism is the practice of gathering, assessing, creating, and presenting news and information. It involves researching, writing, and reporting stories on current events and issues to inform and engage audiences.",
    parent: "Humanities",
  },
  {
    name: "Linguistics",
    description:
      "Linguistics is the scientific study of language and its structure, including its grammar, syntax, semantics, and phonetics. It involves analyzing and understanding how language is used and how it changes over time, as well as how it influences society and culture.",
    parent: "Humanities",
  },
  {
    name: "Mathematics",
    description:
      "Mathematics is the study of numbers, quantities, and shapes, and the relationships between them. It involves exploring patterns and structures through logical reasoning, and using mathematical models to solve problems in various fields such as science, engineering, and finance.",
    parent: "Sciences",
  },
  {
    name: "Media Studies",
    description:
      "Media studies is the interdisciplinary study of mass media and its impact on society and culture. It involves analyzing the production, distribution, and consumption of media content, as well as the social, political, and economic factors that shape media industries.",
    parent: "Humanities",
  },
  {
    name: "Musicology",
    description:
      "Musicology is the scholarly study of music and its history, theory, and cultural context. It involves analyzing and interpreting music as a form of human expression and creativity, as well as examining the social and cultural factors that shape musical practices and traditions.",
    parent: "Humanities",
  },
  {
    name: "Neuroscience",
    description:
      "Neuroscience is the scientific study of the nervous system, including the brain, spinal cord, and nerves. It involves exploring the structure and function of the nervous system, as well as how it influences behavior, cognition, and mental processes.",
    parent: "Sciences",
  },
  {
    name: "Philosophy",
    description:
      "Philosophy is the study of fundamental questions about existence, knowledge, values, reason, and ethics. It involves critically examining and evaluating arguments and concepts, and seeking to understand the nature of reality and human experience.",
    parent: "Humanities",
  },
  {
    name: "Physics",
    description:
      "Physics is the study of matter, energy, and the fundamental laws that govern the universe. It involves exploring the properties of matter and energy, as well as the interactions between them, through observation, experimentation, and mathematical modeling.",
    parent: "Sciences",
  },
  {
    name: "Political Science",
    description:
      "Political science is the study of politics, government, and public policies at the local, national, and international levels. It involves analyzing the structures and functions of political systems, as well as the behavior of individuals and groups in political contexts.",
    parent: "Humanities",
  },
  {
    name: "Psychology",
    description:
      "Psychology is the scientific study of the human mind and behavior. It involves exploring the biological, cognitive, emotional, and social factors that influence mental processes and behavior, as well as developing and applying theories to understand and treat psychological disorders.",
    parent: "Humanities",
  },
  {
    name: "Religious Studies",
    description:
      "Religious studies is the academic study of religion and its role in society and culture. It involves examining the beliefs, practices, and institutions of various religions, as well as exploring the ways in which religion influences individuals and communities.",
    parent: "Humanities",
  },
  {
    name: "Sociology",
    description:
      "Sociology is the scientific study of human social behavior, relationships, and institutions. It examines how society is organized, how individuals and groups interact within society, and how social structures and systems shape people's lives.",
    parent: "Humanities",
  },
  {
    name: "Theater and Performance Studies",
    description:
      "Theater and Performance Studies is an interdisciplinary field that explores the history, theory, and practice of theater, performance, and related art forms. It involves the study of acting, directing, design, dramaturgy, playwriting, and theater history, as well as the analysis of cultural, social, and political contexts in which performances take place.",
    parent: "Arts",
  },
];

const newNodesArray = [];
const addNodes = () => {
  subjects.forEach((subject) => {
    subject.id = createId();
    subject.type = "fieldNode";
    subject.children = [];

    subject.data = {};
    subject.data.name = subject.name;
    subject.data.description = subject.description;

    delete subject.name;
    delete subject.description;

    newNodesArray.push(subject);
  });
  fs.writeFileSync(nodesFile, JSON.stringify(newNodesArray));
  console.log("Success!");
};

// addNodes();

const reformatParents = () => {
  nodes.forEach((node) => {
    const parent = nodes.find((n) => n.data.name === node.parent);

    if (!parent) {
      return;
    }
    node.parent = {
      id: parent.id,
      data: parent.data,
    };

    parent.children.push(node.id);
  });
  fs.writeFileSync(nodesFile, JSON.stringify(nodes));
};

// reformatParents();
