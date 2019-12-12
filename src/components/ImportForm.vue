<template>
  <div class="">
    <h1>Import YML</h1>
    <p>Copy and paste your YAML code below. Make sure it's all correct YAML code to begin with.</p>
    <p>If you have any issues, check <a href="http://www.yamllint.com/" target="_blank">Yamllint</a> to check your YAML for any errors.</p>
    <textarea name="name" rows="8" cols="80" v-model="importedObj"></textarea>
    <div class="">
      {{ convertedObj }}
    </div>
  </div>
</template>

<script>
import YAML from 'yaml'

export default {
  name: "ImportForm",
  data: () => {
    return {
      importedObj: demoContent()
    }
  },
  computed: {
    convertedObj: function (){
      console.log(YAML.parse(this.importedObj))
      return YAML.parse(this.importedObj)
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

<style lang="css">
</style>
