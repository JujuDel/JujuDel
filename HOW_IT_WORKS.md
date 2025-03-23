# HOW IT WOKS

This README is basically constructed based on 2 parts:
 - svg being updated automatically (see [Github Actions](#github-actions))
   - what is inside the folder `metrics`
 - vercel app sending requests to Chess.com Public API (see [Chess.com updates](#chesscom-updates))
   - coming from my other repo [chesscom-vercel](https://github.com/JujuDel/chesscom-vercel)

## Github actions

Source: [lowlighter/metrics](https://github.com/lowlighter/metrics)

The following actions will create images that you can import in your `README.md`

### LeetCode daily updates (more info on the plugin [here](https://github.com/lowlighter/metrics/blob/master/source/plugins/leetcode/README.md))

1. **Pre-requisites**

    - Having a [LeetCode](https://leetcode.com/) account

2. **Workflow**

If you don't have any workflow yet, simply create one with the same content as below, or add the *job* "`github-metrics`" to yours

Don't forget to update the `plugin_leetcode_user` field

<details>
  <summary><code>.github/workflows/daily.yml</code></summary>

  ```yaml
  name: Daily
  on:
    # Schedule daily updates at 12.am
    schedule: [{cron: "0 0 * * *"}]
    # Run workflow manually
    workflow_dispatch:
  jobs:
    github-metrics:
      runs-on: ubuntu-latest
      permissions:
        contents: write
      steps:
        - name: LeetCode
          uses: lowlighter/metrics@latest
          with:
            filename: metrics/metrics.plugin.leetcode.svg
            token: NOT_NEEDED
            base: ""
            plugin_leetcode: yes
            plugin_leetcode_sections: solved, skills, recent
            plugin_leetcode_user: <YOUR_LEETCODE_USERNAME>
            plugin_leetcode_ignored_skills: fundamental
  ```
</details>
</br>

3. **Triggering**

    - *Automatically*, every day around 12.am
    - *Manually* if you go under `Actions`, select your `workflow` (here, `Daily`) and click on `Run workflow`

4. **Output**

A svg in `metrics/metrics.plugin.leetcode.svg`

### 16Personnalities manual update (more info on the plugin [here](https://github.com/lowlighter/metrics/blob/master/source/plugins/community/16personalities/README.md))

1. **Pre-requisites**

    - [Create a GitHub personal taken](https://github.com/lowlighter/metrics/blob/master/.github/readme/partials/documentation/setup/action.md#1%EF%B8%8F-create-a-github-personal-token)

    - [Put your GitHub personal token in repositery secrets](https://github.com/lowlighter/metrics/blob/master/.github/readme/partials/documentation/setup/action.md#2%EF%B8%8F-put-your-github-personal-token-in-repository-secrets)

    - Having a [16Personalities](https://www.16personalities.com/) results URL (either as a repo secret or write it in the workflow file)

2. **Workflow**

Here I made the choice of not running this job daily, like for the LeetCode one, but manually since it is not meant to be changed.

Don't forget to update the `token` and `plugin_16personalities_url` fields if you named them differently

<details>
  <summary><code>.github/workflows/manual.yml</code></summary>

  ```yaml
  name: Manual
  on:
    # Run workflow manually
    workflow_dispatch:
  jobs:
    github-metrics:
      runs-on: ubuntu-latest
      permissions:
        contents: write
      steps:
        - name: MBTI Personality profile
          uses: lowlighter/metrics@latest
          with:
            filename: metrics/metrics.plugin.16personalities.svg
            token: ${{ secrets.METRICS_TOKEN }}
            base: ""
            plugin_16personalities: yes
            plugin_16personalities_url: ${{ secrets.SIXTEEN_PERSONALITIES_URL }}
            plugin_16personalities_sections: personality, profile, traits
            plugin_16personalities_scores: yes
  ```
</details>
</br>

3. **Triggering**

*Manually* if you go under `Actions`, select your `workflow` (here, `Manual`) and click on `Run workflow`

4. **Output**

A svg in `metrics/metrics.plugin.16personalities.svg`

## Chess.com updates

See other repo https://github.com/JujuDel/chesscom-vercel ([README.md](https://github.com/JujuDel/chesscom-vercel/blob/master/README.md) / [HOW_IT_WORKS.md](https://github.com/JujuDel/chesscom-vercel/blob/master/HOW-IT-WORKS.md))

### Available pages

- https://chesscom-vercel-jujudel.vercel.app/chess-current-games/?username=LuckyJujuD
- https://chesscom-vercel-jujudel.vercel.app/chess-last-games/?username=LuckyJujuD

### How it works

In your README.md, simply add the following, and change your username accordingly:

```markdown
<!-- This will show the currently played daily games -->
<a href="https://www.chess.com/member/LuckyJujuD">
  <img src="https://chesscom-vercel-jujudel.vercel.app/chess-current-games/?username=LuckyJujuD" align="center">
</a>

<!-- This will show the last finished games -->
<a href="https://www.chess.com/member/LuckyJujuD">
  <img src="https://chesscom-vercel-jujudel.vercel.app/chess-last-games/?username=LuckyJujuD" align="center">
</a>
```