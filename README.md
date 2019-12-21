# User-friendly YAML Editor

Yedit is a simple YAML editor for non-technical users. Use an easy-to-use graphical user interface to create, edit, and export any YAML code. The editor will help you avoid mistakes or issues with invalid syntax. 

The editor was mainly built for content editors who need to maintain YAML - for example in static sites. 

# How to run your own instance

The editor is a front-end-only Vue application. 

Run `npm install` to setup the project and view the `package.json` file to see available scripts. 

# Roadmap

The editor is usable in its current state. It follows a list of next features to be added:

1. [Error Handling] Show error when user creates label that already exists within object.
2. [Design] Redesign removal icon for values (in arrays) or key-values (in objects)
3. [Feature] Add different types of input fields (let user toggle between them)
  - input
  - textarea
4. autostrip `---` if it's the first or last part of the imported string
5. Import files (with validation)
6. Export files in addition to copying to clipboard
7. Support for Markdown files with frontmatter and a large Markdown body
8. Import/export JSON
9. Import/export CSV (disables nested elements)

## Ideas

- Add more types of input fields: color picker, date picker
- Add file upload (and paste URL of uploaded file as value)
- Import/export XML