// Base API URL - change this if your server runs on a different port
const API_BASE_URL = "http://localhost:3000/colleges";

// Utility functions
function showLoading() {
  document.getElementById("loading").classList.remove("hidden");
}

function hideLoading() {
  document.getElementById("loading").classList.add("hidden");
}

function clearResult(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.innerHTML = "";
  }
}

function displayResult(elementId, data, isError = false) {
  const element = document.getElementById(elementId);
  if (element) {
    const resultClass = isError ? "error" : "success";

    // Debug: Log the data to see what we're receiving
    console.log("displayResult data:", data);
    console.log("Is array:", Array.isArray(data));
    if (Array.isArray(data) && data.length > 0) {
      console.log("First item:", data[0]);
      console.log("Has id property:", data[0].hasOwnProperty("id"));
    }

    // Check if data is an array of colleges for better display
    // More flexible check for college data
    if (Array.isArray(data) && data.length > 0) {
      const firstItem = data[0];
      // Check if it looks like college data (has id and either name or other college properties)
      if (
        firstItem &&
        (firstItem.hasOwnProperty("id") ||
          firstItem.hasOwnProperty("name") ||
          firstItem.hasOwnProperty("address"))
      ) {
        const tableHtml = createCollegeTable(data);
        element.innerHTML = `
                    <div class="result ${resultClass}">
                        ${tableHtml}
                        <details class="json-details">
                            <summary>View Raw JSON</summary>
                            <pre>${JSON.stringify(data, null, 2)}5</pre>
                        </details>
                    </div>
                `;
        return;
      }
    }

    // For single college object (like get by ID), convert to array
    if (
      !Array.isArray(data) &&
      data &&
      typeof data === "object" &&
      (data.hasOwnProperty("id") ||
        data.hasOwnProperty("name") ||
        data.hasOwnProperty("address"))
    ) {
      const tableHtml = createCollegeTable([data]);
      element.innerHTML = `
                <div class="result ${resultClass}">
                    ${tableHtml}
                    <details class="json-details">
                        <summary>View Raw JSON</summary>
                        <pre>${JSON.stringify(data, null, 2)}</pre>
                    </details>
                </div>
            `;
      return;
    }

    // Fallback to JSON display
    element.innerHTML = `
            <div class="result ${resultClass}">
                <pre>${JSON.stringify(data, null, 2)}</pre>
            </div>
        `;
  }
}

function generateCollegeStats(colleges) {
  if (!colleges || colleges.length === 0) {
    return "";
  }

  // Get unique addresses count
  const uniqueAddresses = new Set(colleges.map((c) => c.address)).size;

  // Get most recent entry
  const newest = colleges
    .filter((c) => c.created_at)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];

  let stats = `(${uniqueAddresses} unique locations)`;
  if (newest) {
    const newestDate = new Date(newest.created_at).toLocaleDateString();
    stats += ` | Latest: ${newest.name} (${newestDate})`;
  }

  return stats;
}

function createCollegeTable(colleges) {
  if (!colleges || colleges.length === 0) {
    return '<p class="no-data">No colleges found</p>';
  }

  const tableRows = colleges
    .map(
      (college) => `
        <tr>
            <td data-label="ID">${college.id || "N/A"}</td>
            <td data-label="Name">${college.name || "N/A"}</td>
            <td data-label="Address">${college.address || "N/A"}</td>
        </tr>
    `
    )
    .join("");

  return `
        <div class="table-container">
            <div class="table-header">
                <h4><i class="fas fa-table"></i> Colleges Data (${
                  colleges.length
                } record${colleges.length !== 1 ? "s" : ""})</h4>
                <div class="view-controls">
                    <button onclick="toggleView(this, 'card')" class="btn-view-toggle" title="Toggle to card view">
                        <i class="fas fa-th-large"></i> Card View
                    </button>
                    <button onclick="toggleView(this, 'list')" class="btn-view-toggle" title="Toggle to list view">
                        <i class="fas fa-list"></i> List View
                    </button>
                </div>
            </div>
            <table class="college-table">
                <thead>
                    <tr style="color:white !important;">
                        <td  style="color:white !important;"><i class="fas fa-hashtag" ></i> ID</td>
                        <td  style="color:white !important;"><i class="fas fa-university"></i> Name</td>
                        <td  style="color:white !important;"><i class="fas fa-map-marker-alt"></i> Address</td>
                    </tr>
                </thead>
                <tbody>
                    ${tableRows}
                </tbody>
            </table>
            <div class="card-view hidden">
                ${createCollegeCards(colleges)}
            </div>
            <div class="list-view hidden">
                ${createCollegeList(colleges)}
            </div>
        </div>
    `;
}

function createCollegeCards(colleges) {
  return colleges
    .map(
      (college) => `
        <div class="college-card">
            <div class="card-header">
                <h5><i class="fas fa-university"></i> ${
                  college.name || "N/A"
                }</h5>
                <span class="college-id">ID: ${college.id || "N/A"}</span>
            </div>
            <div class="card-body">
                <p class="card-address">
                    <i class="fas fa-map-marker-alt"></i>
                    ${college.address || "N/A"}
                </p>
                <p class="card-date">
                    <i class="fas fa-calendar"></i>
                    Created: ${
                      college.created_at
                        ? new Date(college.created_at).toLocaleDateString()
                        : "N/A"
                    }
                </p>
            </div>
        </div>
    `
    )
    .join("");
}

function createCollegeList(colleges) {
  if (!colleges || colleges.length === 0) {
    return '<p class="no-data">No colleges found</p>';
  }

  const listItems = colleges
    .map(
      (college) => `
        <li class="college-list-item">
            <div class="list-item-header">
                <strong>${college.name || "N/A"}</strong>
                <span class="college-id-badge">ID: ${college.id || "N/A"}</span>
            </div>
            <div class="list-item-details">
                <span class="address"><i class="fas fa-map-marker-alt"></i> ${
                  college.address || "N/A"
                }</span>
                <span class="date"><i class="fas fa-calendar"></i> ${
                  college.created_at
                    ? new Date(college.created_at).toLocaleDateString()
                    : "N/A"
                }</span>
            </div>
        </li>
    `
    )
    .join("");

  return `
        <div class="list-content">
            <div class="list-header">
                <button onclick="exportCollegeList()" class="btn-export" title="Export list as text">
                    <i class="fas fa-download"></i> Export List
                </button>
            </div>
            <ul class="college-list">
                ${listItems}
            </ul>
        </div>
    `;
}

function toggleView(button, targetView) {
  const container = button.closest(".table-container");
  const table = container.querySelector(".college-table");
  const cardView = container.querySelector(".card-view");
  const listView = container.querySelector(".list-view");
  const buttons = container.querySelectorAll(".btn-view-toggle");

  // Hide all views
  table.classList.add("hidden");
  cardView.classList.add("hidden");
  listView.classList.add("hidden");

  // Reset all button states
  buttons.forEach((btn) => btn.classList.remove("active"));

  // Show the target view and update button
  if (targetView === "card") {
    cardView.classList.remove("hidden");
    button.classList.add("active");
  } else if (targetView === "list") {
    listView.classList.remove("hidden");
    button.classList.add("active");
  } else {
    // Default to table view
    table.classList.remove("hidden");
    // Find and activate the table button (the one without targetView)
    const tableButton = [...buttons].find(
      (btn) =>
        !btn.onclick.toString().includes("card") &&
        !btn.onclick.toString().includes("list")
    );
    if (tableButton) tableButton.classList.add("active");
  }
}

function exportCollegeList() {
  // Get the current college data from the active list view
  const listView = document.querySelector(".list-view:not(.hidden)");
  if (!listView) {
    showMessage("allCollegesResult", "❌ No list view active to export", true);
    return;
  }

  const listItems = listView.querySelectorAll(".college-list-item");
  if (listItems.length === 0) {
    showMessage("allCollegesResult", "❌ No list data to export", true);
    return;
  }

  let exportText = "College List Export\n";
  exportText += "==================\n\n";

  listItems.forEach((item, index) => {
    const header =
      item.querySelector(".list-item-header strong")?.textContent || "N/A";
    const id = item.querySelector(".college-id-badge")?.textContent || "N/A";
    const address =
      item.querySelector(".address")?.textContent?.replace(/.*📍\s*/, "") ||
      "N/A";
    const date =
      item.querySelector(".date")?.textContent?.replace(/.*📅\s*/, "") || "N/A";

    exportText += `${index + 1}. ${header}\n`;
    exportText += `   ${id}\n`;
    exportText += `   Address: ${address}\n`;
    exportText += `   Created: ${date}\n\n`;
  });

  // Create and download the file
  const blob = new Blob([exportText], { type: "text/plain" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `college-list-${new Date().toISOString().split("T")[0]}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);

  showMessage("allCollegesResult", "✅ College list exported successfully!");
}

function showMessage(elementId, message, isError = false) {
  const element = document.getElementById(elementId);
  if (element) {
    const messageClass = isError ? "error" : "success";
    element.innerHTML = `
            <div class="message ${messageClass}">
                <i class="fas ${
                  isError ? "fa-exclamation-triangle" : "fa-check-circle"
                }"></i>
                ${message}
            </div>
        `;
  }
}

// API Functions

// 1. Get All Colleges (GET /colleges)
async function getAllColleges() {
  showLoading();
  clearResult("allCollegesResult");

  try {
    const response = await fetch(`${API_BASE_URL}/`);
    const data = await response.json();

    if (response.ok) {
      displayResult("allCollegesResult", data);
      const stats = generateCollegeStats(data);
      showMessage(
        "allCollegesResult",
        `✅ Successfully fetched ${data.length} colleges ${stats}`
      );
      // display the data in the result list
      displayResult("allCollegesResultList", data);
    } else {
      displayResult("allCollegesResult", data, true);
    }
  } catch (error) {
    console.error("Error fetching colleges:", error);
    showMessage("allCollegesResult", `❌ Error: ${error.message}`, true);
  } finally {
    hideLoading();
  }
}

// 2. Get College by ID (GET /colleges/detail/:id)
async function getCollegeById() {
  const collegeId = document.getElementById("collegeId").value;

  if (!collegeId) {
    showMessage("collegeByIdResult", "❌ Please enter a college ID", true);
    return;
  }

  showLoading();
  clearResult("collegeByIdResult");

  try {
    const response = await fetch(`${API_BASE_URL}/detail/${collegeId}`);
    const data = await response.json();

    if (response.ok) {
      if (data.length > 0) {
        displayResult("collegeByIdResult", data);
        showMessage(
          "collegeByIdResult",
          `✅ College found with ID: ${collegeId}`
        );
        displayResult("allCollegesResultList", data);
      } else {
        displayResult("collegeByIdResult", [], false);
        showMessage(
          "collegeByIdResult",
          `⚠️ No college found with ID: ${collegeId}`,
          true
        );
      }
    } else {
      displayResult("collegeByIdResult", data, true);
    }
  } catch (error) {
    console.error("Error fetching college:", error);
    showMessage("collegeByIdResult", `❌ Error: ${error.message}`, true);
  } finally {
    hideLoading();
  }
}

// 3. Search College by Name (GET /colleges/search/:name)
async function searchCollegeByName() {
  const collegeName = document.getElementById("collegeName").value.trim();

  if (!collegeName) {
    showMessage("searchResult", "❌ Please enter a college name", true);
    return;
  }

  showLoading();
  clearResult("searchResult");

  try {
    const response = await fetch(
      `${API_BASE_URL}/search/${encodeURIComponent(collegeName)}`
    );
    const data = await response.json();

    if (response.ok) {
      if (data.length > 0) {
        displayResult("searchResult", data);
        showMessage(
          "searchResult",
          `✅ Found ${data.length} college(s) matching "${collegeName}"`
        );
      } else {
        displayResult("searchResult", [], false);
        showMessage(
          "searchResult",
          `⚠️ No colleges found with name: "${collegeName}"`,
          true
        );
      }
      displayResult("searchResult", data);
    } else {
      displayResult("searchResult", data, true);
    }
  } catch (error) {
    console.error("Error searching college:", error);
    showMessage("searchResult", `❌ Error: ${error.message}`, true);
  } finally {
    hideLoading();
  }
}

// 4. Create College (POST /colleges/create)
async function createCollege() {
  const name = document.getElementById("newCollegeName").value.trim();
  const address = document.getElementById("newCollegeAddress").value.trim();

  if (!name || !address) {
    showMessage(
      "createResult",
      "❌ Please fill in both name and address fields",
      true
    );
    return;
  }

  showLoading();
  clearResult("createResult");

  try {
    const response = await fetch(`${API_BASE_URL}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        address: address,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      displayResult("createResult", data);
      showMessage("createResult", `✅ College "${name}" created successfully!`);
      // Clear form fields
      document.getElementById("newCollegeName").value = "";
      document.getElementById("newCollegeAddress").value = "";
    } else {
      displayResult("createResult", data, true);
      showMessage(
        "createResult",
        `❌ Failed to create college: ${data.data || "Unknown error"}`,
        true
      );
    }
  } catch (error) {
    console.error("Error creating college:", error);
    showMessage("createResult", `❌ Error: ${error.message}`, true);
  } finally {
    hideLoading();
  }
}

// 5. Update College (PUT /colleges/update/:id)
async function updateCollege() {
  const id = document.getElementById("updateCollegeId").value;
  const name = document.getElementById("updateCollegeName").value.trim();
  const address = document.getElementById("updateCollegeAddress").value.trim();

  if (!id || !name || !address) {
    showMessage(
      "updateResult",
      "❌ Please fill in all fields (ID, name, and address)",
      true
    );
    return;
  }

  showLoading();
  clearResult("updateResult");

  try {
    const response = await fetch(`${API_BASE_URL}/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        address: address,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      displayResult("updateResult", data);
      showMessage(
        "updateResult",
        `✅ College with ID ${id} updated successfully!`
      );
      // Clear form fields
      document.getElementById("updateCollegeId").value = "";
      document.getElementById("updateCollegeName").value = "";
      document.getElementById("updateCollegeAddress").value = "";
    } else {
      displayResult("updateResult", data, true);
      showMessage(
        "updateResult",
        `❌ Failed to update college: ${data.data || "Unknown error"}`,
        true
      );
    }
  } catch (error) {
    console.error("Error updating college:", error);
    showMessage("updateResult", `❌ Error: ${error.message}`, true);
  } finally {
    hideLoading();
  }
}

// 6. Delete College (DELETE /colleges/delete/:id)
async function deleteCollege() {
  const collegeId = document.getElementById("deleteCollegeId").value;

  if (!collegeId) {
    showMessage("deleteResult", "❌ Please enter a college ID to delete", true);
    return;
  }

  if (
    !confirm(
      `Are you sure you want to delete college with ID ${collegeId}? This action cannot be undone.`
    )
  ) {
    return;
  }

  showLoading();
  clearResult("deleteResult");

  try {
    const response = await fetch(`${API_BASE_URL}/delete/${collegeId}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (response.ok) {
      displayResult("deleteResult", data);
      showMessage(
        "deleteResult",
        `✅ College with ID ${collegeId} deleted successfully!`
      );
      // Clear form field
      document.getElementById("deleteCollegeId").value = "";
    } else {
      displayResult("deleteResult", data, true);
      showMessage(
        "deleteResult",
        `❌ Failed to delete college: ${data.data || "Unknown error"}`,
        true
      );
    }
  } catch (error) {
    console.error("Error deleting college:", error);
    showMessage("deleteResult", `❌ Error: ${error.message}`, true);
  } finally {
    hideLoading();
  }
}

// Utility function to test all endpoints
async function testAllEndpoints() {
  console.log("🧪 Testing all API endpoints...");

  // Test with a delay between each call
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  try {
    console.log("1. Testing GET all colleges...");
    await getAllColleges();
    await delay(1000);

    console.log("2. Testing GET college by ID...");
    document.getElementById("collegeId").value = "1";
    await getCollegeById();
    await delay(1000);

    console.log("3. Testing search college by name...");
    document.getElementById("collegeName").value = "Test College";
    await searchCollegeByName();
    await delay(1000);

    console.log("✅ API endpoint testing completed!");
  } catch (error) {
    console.error("❌ Error during testing:", error);
  }
}

// Add keyboard event listeners for better UX
document.addEventListener("DOMContentLoaded", function () {
  // Enter key listeners for input fields
  document
    .getElementById("collegeId")
    .addEventListener("keypress", function (e) {
      if (e.key === "Enter") getCollegeById();
    });

  document
    .getElementById("collegeName")
    .addEventListener("keypress", function (e) {
      if (e.key === "Enter") searchCollegeByName();
    });

  document
    .getElementById("newCollegeAddress")
    .addEventListener("keypress", function (e) {
      if (e.key === "Enter") createCollege();
    });

  document
    .getElementById("updateCollegeAddress")
    .addEventListener("keypress", function (e) {
      if (e.key === "Enter") updateCollege();
    });

  document
    .getElementById("deleteCollegeId")
    .addEventListener("keypress", function (e) {
      if (e.key === "Enter") deleteCollege();
    });

  console.log("🚀 College API Demo loaded successfully!");
  console.log(
    "💡 You can use testAllEndpoints() function to test all endpoints at once"
  );
});
