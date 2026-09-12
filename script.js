const cases = [
  {
    number: "CASE #001",
    title: "Connected, but no internet access.",
    description:
      "The user is connected to Wi-Fi, but cannot open any website.",
    info: [
      ["OS", "Windows 11"],
      ["Connection", "Wi-Fi"],
      ["IP Address", "169.254.21.8"]
    ],
    answers: [
      {
        text: "Check DNS",
        correct: false,
        explanation:
          "DNS is not the best first step because the device does not have a valid local network address."
      },
      {
        text: "Run ipconfig",
        correct: true,
        explanation:
          "Correct. An IP address in the 169.254.x.x range usually indicates APIPA, meaning the device failed to obtain an IP address from DHCP."
      },
      {
        text: "Restart PC",
        correct: false,
        explanation:
          "Restarting may help, but troubleshooting should begin by checking the network configuration."
      },
      {
        text: "Reinstall Browser",
        correct: false,
        explanation:
          "The browser is unlikely to be the cause because the network configuration already shows an issue."
      }
    ]
  },

  {
    number: "CASE #002",
    title: "A website cannot be reached.",
    description:
      "The user can open other websites, but one specific website fails to load.",
    info: [
      ["Browser", "Chrome"],
      ["Internet", "Connected"],
      ["Other Sites", "Working"]
    ],
    answers: [
      {
        text: "Check DNS resolution",
        correct: true,
        explanation:
          "Correct. If other sites work, checking DNS resolution for the affected domain is a logical next step."
      },
      {
        text: "Replace Wi-Fi adapter",
        correct: false,
        explanation:
          "The Wi-Fi adapter is functioning because the user can access other websites."
      },
      {
        text: "Format the PC",
        correct: false,
        explanation:
          "Formatting the PC is unnecessary and far too extreme for this issue."
      },
      {
        text: "Change monitor cable",
        correct: false,
        explanation:
          "The monitor cable has no relation to website connectivity."
      }
    ]
  },

  {
    number: "CASE #003",
    title: "The laptop is extremely slow.",
    description:
      "The user reports that applications take a long time to open and the system frequently freezes.",
    info: [
      ["CPU", "18%"],
      ["Memory", "96%"],
      ["Disk", "42%"]
    ],
    answers: [
      {
        text: "Check memory usage",
        correct: true,
        explanation:
          "Correct. Memory usage is at 96%, so RAM pressure is the most obvious issue to investigate first."
      },
      {
        text: "Replace keyboard",
        correct: false,
        explanation:
          "A keyboard issue would not explain high system memory usage."
      },
      {
        text: "Change wallpaper",
        correct: false,
        explanation:
          "Changing the wallpaper will not solve severe memory usage."
      },
      {
        text: "Reset router",
        correct: false,
        explanation:
          "The issue affects system performance, not internet connectivity."
      }
    ]
  },

  {
    number: "CASE #004",
    title: "The office printer shows Offline.",
    description:
      "A shared network printer cannot receive print jobs from one workstation.",
    info: [
      ["Printer", "Network Printer"],
      ["Status", "Offline"],
      ["Other PCs", "Can Print"]
    ],
    answers: [
      {
        text: "Check printer connection on the PC",
        correct: true,
        explanation:
          "Correct. Since other PCs can print, the issue is likely local to this workstation."
      },
      {
        text: "Replace printer immediately",
        correct: false,
        explanation:
          "The printer itself is working because other workstations can still use it."
      },
      {
        text: "Restart all office PCs",
        correct: false,
        explanation:
          "Restarting every PC is unnecessary when the problem only affects one workstation."
      },
      {
        text: "Change Wi-Fi password",
        correct: false,
        explanation:
          "Changing the Wi-Fi password would create more connectivity problems and is not relevant here."
      }
    ]
  },

  {
    number: "CASE #005",
    title: "The user cannot access a shared folder.",
    description:
      "The shared folder works for other employees, but this user receives an Access Denied message.",
    info: [
      ["Network", "Connected"],
      ["Server", "Online"],
      ["Error", "Access Denied"]
    ],
    answers: [
      {
        text: "Check user permissions",
        correct: true,
        explanation:
          "Correct. An Access Denied message strongly suggests a permissions or access-control issue."
      },
      {
        text: "Replace Ethernet cable",
        correct: false,
        explanation:
          "The network is connected and the server is reachable, so the cable is unlikely to be the issue."
      },
      {
        text: "Restart the server",
        correct: false,
        explanation:
          "Restarting the server could affect everyone and is unnecessary because other users can access the folder."
      },
      {
        text: "Delete the shared folder",
        correct: false,
        explanation:
          "Deleting the folder would destroy data and does not solve the user's access issue."
      }
    ]
  }
];

let currentCaseIndex = 0;
let score = 0;
let answered = false;

const caseTitle = document.getElementById("caseTitle");
const caseDescription = document.getElementById("caseDescription");
const caseNumber = document.getElementById("caseNumber");
const deviceInfo = document.getElementById("deviceInfo");
const answerButtons = document.getElementById("answerButtons");
const result = document.getElementById("result");
const scoreElement = document.getElementById("score");
const currentCaseElement = document.getElementById("currentCase");
const totalCaseElement = document.getElementById("totalCase");
const nextButton = document.getElementById("nextButton");
const caseCard = document.getElementById("caseCard");
const finalScreen = document.getElementById("finalScreen");
const finalScore = document.getElementById("finalScore");
const finalMessage = document.getElementById("finalMessage");

totalCaseElement.textContent = cases.length;

function loadCase() {
  answered = false;

  const current = cases[currentCaseIndex];

  caseNumber.textContent = current.number;
  caseTitle.textContent = current.title;
  caseDescription.textContent = current.description;
  currentCaseElement.textContent = currentCaseIndex + 1;

  result.classList.add("hidden");
  result.classList.remove("correct", "wrong");
  result.innerHTML = "";

  nextButton.classList.add("hidden");

  deviceInfo.innerHTML = "";

  current.info.forEach(item => {
    const box = document.createElement("div");

    box.innerHTML = `
      <span>${item[0]}</span>
      <strong>${item[1]}</strong>
    `;

    deviceInfo.appendChild(box);
  });

  answerButtons.innerHTML = "";

  current.answers.forEach(answer => {
    const button = document.createElement("button");

    button.textContent = answer.text;

    button.onclick = () => selectAnswer(answer);

    answerButtons.appendChild(button);
  });
}

function selectAnswer(answer) {
  if (answered) return;

  answered = true;

  const buttons = answerButtons.querySelectorAll("button");

  buttons.forEach(button => {
    button.disabled = true;
  });

  result.classList.remove("hidden");

  if (answer.correct) {
    score += 10;

    scoreElement.textContent = score;

    result.classList.add("correct");

    result.innerHTML = `
      <strong>✓ Correct</strong>
      <br><br>
      ${answer.explanation}
    `;
  } else {
    result.classList.add("wrong");

    result.innerHTML = `
      <strong>✗ Not quite</strong>
      <br><br>
      ${answer.explanation}
    `;
  }

  if (currentCaseIndex === cases.length - 1) {
    nextButton.textContent = "View Final Result →";
  } else {
    nextButton.textContent = "Next Case →";
  }

  nextButton.classList.remove("hidden");
}

function nextCase() {
  currentCaseIndex++;

  if (currentCaseIndex < cases.length) {
    loadCase();
  } else {
    showFinalScreen();
  }
}

function showFinalScreen() {
  caseCard.classList.add("hidden");
  finalScreen.classList.remove("hidden");

  finalScore.textContent = `${score}/50`;

  if (score === 50) {
    finalMessage.textContent =
      "Excellent. You handled every troubleshooting scenario correctly.";
  } else if (score >= 30) {
    finalMessage.textContent =
      "Good job. Your troubleshooting fundamentals are solid, but there is still room to improve.";
  } else {
    finalMessage.textContent =
      "Keep practicing. Focus on identifying the most relevant symptom before choosing a solution.";
  }
}

function restartSimulator() {
  currentCaseIndex = 0;
  score = 0;

  scoreElement.textContent = 0;

  finalScreen.classList.add("hidden");
  caseCard.classList.remove("hidden");

  loadCase();
}

loadCase();
