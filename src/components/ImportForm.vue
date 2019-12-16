<template>
  <div class="wrapper">

    <div class="import__label">
      <h3>Import YML</h3>
    </div>

    <div class="import">
      <textarea name="name" rows="8" @input="parseImport" v-model="importStr"></textarea>
    </div>

    <div class="editor__label">
      <h3>Edit YML</h3>
    </div>

    <div class="editor">
      <p>
        Paste or enter your <a href="http://www.yamllint.com/" target="_blank">clean YAML</a> to the right 👉.<br>
        Edit it below 👇. Export the resulting YAML at the bottom right.
      </p>
      <div class="editor__form">

        <div class="editor__field" v-for="(val, key, i) in editableObj" v-bind:key="`editable-wrapper-${i || key}`">
          <FormField v-bind:uid="i || key" v-bind:name="key || ''" v-model="editableObj[key]" />
        </div>
        
      </div>
    </div>

    <div class="expor__label">
      <h3>Export YML</h3>
    </div>

    <div class="export">
      <pre class="export__content" v-on:click="copyExport">{{exportStr}}</pre>
    </div>
  </div>
</template>

<script>
  import YAML from 'yaml'
  // import {getType, isNumOrStr} from '@/services/Utility.js'
  import FormField from '@/components/FormField.vue'

  export default {
    name: "ImportForm",
    components: {FormField},
    props: {},
    data: () => {
      return {
        importStr: demoContent(), // DEMO CONTENT - TODO: Remove!
        editableObj: YAML.parse(demoContent()), // DEMO CONTENT - TODO: Remove!
      }
    },
    computed: {
      exportStr: function(){
        return YAML.stringify(this.editableObj)
      }
    },
    methods: {
      parseImport: function(){
        try{
          // TODO Make sure this is always an object or array?
          this.editableObj = YAML.parse(this.importStr)
        }catch(error){
          this.editableObj = "Whoops. You don't seem to have entered valid YAML"
        }
      },
      copyExport: function(){
        navigator.clipboard.writeText(this.exportStr).then(() => {
          alert("Export YML copied to clipboard. You can now just paste it anywhere.")
        })
      }
    }
  }

  function demoContent() { return`
  project_url_field: 0
  code_url_field: 0
  upload_field: 1
  estimated_read_time: 30
  estimated_task_time: 300
  learning_goals: |
    Conduct a competitive analysis to inform student project design
  tasks: |
    For this Task, you’ll begin working on Student Project 2. First, you’ll select your Student Project out of the options available, before conducting a competitive analysis as per the discovery/understand phase of each of the design approaches introduced in this Exercise.

    **Directions**

    1. Take a look at the examples for each of the Student Project 2 options.
    2. Prepare a proposal including which Student Project topic you’ve selected, a rationale for why you’ve decided on it, along with any preliminary ideas if you have them.
    3. Select 2-3 competitor web apps on which to conduct a competitive analysis. Feel free to use any of the apps listed as examples in the Student Project 2 section of this Exercise.
  mentor_questions: |
  rubrics:
    not_yet:
      topics:
        - Deliverable(s) submitted are not relevant to the Task instructions provided, are missing most components, or have been plagiarized
      tips:
        1:
          text: "Your student should re-read the Exercise and Task and make sure they understand the deliverables that are expected."
        2:
          text: "Your student may be interested in the following resource on how to conduct a competitive analysis:"
          links:
            - "[Guide to Competitor Analysis](https://mattish.com/evidence/method/competitor-analysis)"
    a_little_more:
      topics:
        - Both Student Project proposal and competitive analysis submitted, but both require additional information and parts are missing. For example, only one competitor web app analyzed; OR
        - Either project proposal or competitive analysis is missing from the submission
      tips:
        1:
          text: "If your student is struggling to find a competitor web app for their project, encourage them to think a bit differently about what is being asked of them. For example, if they’re looking for a shopping web app, this could range from an online garden center to a sandal store."
        2:
          text: "The following resources on the various components of a competitive analysis may help your student to better understand what is being asked of them:"
          links:
            - "[How to Do a UX Competitor Analysis](https://usabilitygeek.com/how-to-do-ux-competitor-analysis/)"
            - "[Website SWOT analysis](https://boagworld.com/digital-strategy/swot-analysis/)"
    almost_there:
      topics:
        - Both Student Project proposal and competitive analysis of at least 2 competitors submitted
        - Project proposal requires further development or clarification, or parts are missing; OR
        - Competitive analysis lacks clarity, requires additional information, or parts are missing
      tips:
        1:
          text: "If any areas of your student’s proposal are unclear or require more development, give them specific feedback about those particular parts."
        2:
          text: "If your student is struggling to grasp the value of a thorough competitive analysis, remind your student that this can be a valuable portfolio piece when robust and polished. Share the following article with them:"
          links:
            - "[Stop Copying, and Start Doing Competitor UX Analysis Properly](https://uxplanet.org/stop-copying-and-start-doing-competitor-ux-analysis-properly-bff8dbfc644f)"
    approved:
      topics:
        - Student Project proposal submitted; ideas and rationale have been clearly explained
        - Competitive analysis for at least 2 competitor web apps is well-organized and includes all requested components
      tips:
        1:
          text: "Encourage your student to analyze additional competitor web apps in order to gain a more holistic overview of the competition."
        2:
          text: "Now that your student has seen the competition, encourage them to think critically about mimicking other designs or patterns. Remind them of the usability heuristic called “Recognition Rather Than Recall.” The following article will refresh their memory on this:"
          links:
            - "[Memory Recognition and Recall in User Interfaces](https://www.nngroup.com/articles/recognition-and-recall/)"
  `}
</script>

<style lang="scss">
  .wrapper {
    max-height: 100vh;

    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: auto 4fr auto 8fr;
    grid-template-areas:
      'editor__label import__label'
      'editor import'
      'editor export__label'
      'editor export';

    & > * { overflow: scroll; }

    @media(max-width: 700px){
      display: block;
    }
  }

  .editor__label { grid-area: editor__label; }
  .editor { grid-area: editor; }
  .import__label { grid-area: import__label; }
  .import {
    grid-area: import;

    textarea {
      height: 100%;
      width: 100%;
      background-color: #eee;
      border: none;
      resize: none;
      outline: none;

      box-shadow: inset 0 0 5px #888;
    }
  }
  .export__label { grid-area: export__label; }
  .export {
    grid-area: export;

    pre {
      margin: 0;
      font-family: inherit;
      background-color: #ddd;

      overflow: auto;
      padding: 5px;

      cursor: pointer;
      transition: .4s all;

      &:hover {
        background-color: lightgreen;
      }
    }
  }
</style>
