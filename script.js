let score = 0;

function answer(choice) {
  const result = document.getElementById("result");
  const scoreElement = document.getElementById("score");

  result.classList.remove("hidden", "correct", "wrong");

  if (choice === "ipconfig") {
    score += 10;

    result.classList.add("correct");

    result.innerHTML = `
      <strong>✓ Correct troubleshooting step</strong>
      <br><br>

      Running <code>ipconfig</code> is a good first step.

      <br><br>

      The IP address <strong>169.254.x.x</strong> usually means Windows
      assigned an APIPA address because the device failed to get an IP
      address from the DHCP server.

      <br><br>

      Next step: check DHCP connectivity or try renewing the IP address.
    `;
  } else if (choice === "dns") {
    result.classList.add("wrong");

    result.innerHTML = `
      <strong>Not the best first step.</strong>
      <br><br>

      DNS problems usually happen after the device already has a valid
      network configuration.

      <br><br>

      Notice the IP address: <strong>169.254.21.8</strong>.
    `;
  } else if (choice === "restart") {
    result.classList.add("wrong");

    result.innerHTML = `
      <strong>Restarting might help, but...</strong>
      <br><br>

      A good IT support technician should try to identify the cause first
      instead of restarting immediately.
    `;
  } else {
    result.classList.add("wrong");

    result.innerHTML = `
      <strong>The browser is probably not the cause.</strong>
      <br><br>

      The network configuration already shows something unusual.
      Check the IP configuration first.
    `;
  }

  scoreElement.textContent = score;
}
