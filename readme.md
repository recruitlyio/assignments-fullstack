
### Problem-Solution Breakdown

#### 1. **Problem: Search Engine Indexing**

* The application must be indexed properly by search engines for discoverability.

**Solution:**

* Design and implement pages in an SEO-friendly manner (e.g., server-rendered pages, meta tags, sitemaps).

---

#### 2. **Problem: Handling Multiple Resume Uploads and Parsing**

There are challenges with how resumes are parsed and processed, especially at scale.

**Solutions:**

* **Approach A: Backend Parsing**

  * Parse resumes on the server after upload.
  * *Challenges*: High RAM usage, difficulty scaling with traffic, need for message queues for async processing.

* **Approach B: Use LLMs (e.g., Gemini)**

  * Send resume files to an LLM to get structured data.
  * *Challenges*: Expensive API calls, especially for large files.

* **Approach C: Frontend Parsing (Recommended)**

  * Perform parsing on the client-side (browser/PC) and send structured data to the server.
  * *Advantages*: Offloads processing to client machines, reducing server load.

---

#### 3. **Problem: High RAM Usage with Large Resume Sets**

* Processing many or large resumes can consume significant RAM.

**Solution:**

* Process a limited batch of resume content at a time.
* Use a database to persist intermediate data, retaining it for 24 hours to avoid loss and reprocessing.

---

#### 4. **Problem: Filtering Candidates Effectively**

* Manually shortlisting resumes is inefficient and prone to bias/errors.

**Solution:**

* Apply configurable conditions and filters to automatically shortlist candidates based on parsed resume data.

---

#### 5. **Problem: No Standardized Export Format for Shortlisted Resumes**

* Difficulty in sharing or integrating shortlisted candidates into other systems.

**Solution:**

* Provide export options:

  * **CSV** for spreadsheet-based workflows.
  * **PDF** for formatted, printable reports.

---
