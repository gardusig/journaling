# journaling

This project is a Google Apps Script designed to automate the creation of journaling documents in Google Drive. It uses a library called `ToiletPaper` with a namespace `Tissuer` to manage Google Docs, with a playful and humorous theme.

## Features

- Automatically creates a new journaling document named with the current date.
- Organizes documents into weekly folders.
- Uses a namespace structure to keep the code organized and modular.

## Setup

1. **Clone the repository or copy the code** into your Google Apps Script project.
2. **Ensure the `ToiletPaper` library is included** in your project:
   - In the Google Apps Script editor, go to `Resources` > `Libraries`.
   - Add the `ToiletPaper` library using its Script ID.

## Usage

The main function to run is `main()`. This function will create a new journaling document in the appropriate weekly folder.

### Functions

- **main()**: Entry point of the script. Calls `Journal.createJournalDoc()` to create a new journaling document.
- **Journal.createJournalDoc()**: Creates a new journaling document named with the current date and stores it in the appropriate weekly folder.

## Example

```javascript
// To create a new journaling document, simply run the main function:
function main() {
  Journal.createJournalDoc();
}
```
