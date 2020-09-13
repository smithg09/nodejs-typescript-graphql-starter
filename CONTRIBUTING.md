# Contributing to nodejs-typescript-graphql-starter

We would love for you to contribute and help make it even better than it is today!
As a contributor, here are the guidelines we would like you to follow:

 - [Code of Conduct](#coc)
 - [Issues and Bugs](#issue)
 - [Feature Requests](#feature)
 - [Submission Guidelines](#submit)
 - [Commit Message Guidelines](#commit)


## <a name="coc"></a> Code of Conduct

Please read and follow our [Code of Conduct][coc].


## <a name="issue"></a> Found a Bug?

If you find a bug in the source code, you can help us by [submitting an issue](#submit-issue) to our [GitHub Repository][github].
Even better, you can [submit a Pull Request](#submit-pr) with a fix.


## <a name="feature"></a> Missing a Feature?
You can *request* a new feature by [submitting an issue](#submit-issue) to our GitHub Repository.
If you would like to *implement* a new feature, please consider the size of the change in order to determine the right steps to proceed:

* For a **Major Feature**, first open an issue and outline your proposal so that it can be discussed.
  This process allows us to better coordinate our efforts, prevent duplication of work, and help you to craft the change so that it is successfully accepted into the project.

  **Note**: Adding a new topic to the documentation, or significantly re-writing a topic, counts as a major feature.

* **Small Features** can be crafted and directly [submitted as a Pull Request](#submit-pr).


## <a name="submit"></a> Submission Guidelines


### <a name="submit-issue"></a> Submitting an Issue

Before you submit an issue, please search the issue tracker, maybe an issue for your problem already exists and the discussion might inform you of workarounds readily available.

We want to fix all the issues as soon as possible, but before fixing a bug we need to reproduce and confirm it.
In order to reproduce bugs, we require that you provide a minimal reproduction.
Having a minimal reproducible scenario gives us a wealth of important information without going back and forth to you with additional questions.

A minimal reproduction allows us to quickly confirm a bug (or point out a coding problem) as well as confirm that we are fixing the right problem.

You can file [new issues](https://github.com/smithg09/nodejs-typescript-graphql-starter/issues/new?title=Feature%20Request).


### <a name="submit-pr"></a> Submitting a Pull Request (PR)

Before you submit your Pull Request (PR) consider the following guidelines:

1. Search [GitHub](https://github.com/smithg09/nodejs-typescript-graphql-starter/pulls) for an open or closed PR that relates to your submission.
   You don't want to duplicate existing efforts.

2. Be sure that an issue describes the problem you're fixing, or documents the design for the feature you'd like to add.
   Discussing the design upfront helps to ensure that we're ready to accept your work.

3. Fork the smithg09/nodejs-typescript-graphql-starter repo.

4. Make your changes in a new git branch:

     ```shell
     git checkout -b my-fix-branch master
     ```

5. Create your patch, **including appropriate test cases**.

6. Commit your changes using a descriptive commit message that follows our [commit message conventions](#commit).
   Adherence to these conventions is necessary because release notes are automatically generated from these messages.

     ```shell
     git commit -a
     ```
    Note: the optional commit `-a` command line option will automatically "add" and "rm" edited files.

7. Push your branch to GitHub:

    ```shell
    git push origin my-fix-branch
    ```

8. In GitHub, send a pull request to `nodejs-typescript-graphql-starter:master`.

   If we ask for changes via code reviews then:

   * Make the required updates.
   * Rebase your branch and force push to your GitHub repository (this will update your Pull Request):

      ```shell
      git rebase master -i
      git push -f
      ```

That's it! Thank you for your contribution!


#### After your pull request is merged

After your pull request is merged, you can safely delete your branch and pull the changes from the main (upstream) repository:

* Delete the remote branch on GitHub either through the GitHub web UI or your local shell as follows:

    ```shell
    git push origin --delete my-fix-branch
    ```

* Check out the master branch:

    ```shell
    git checkout master -f
    ```

* Delete the local branch:

    ```shell
    git branch -D my-fix-branch
    ```

* Update your master with the latest upstream version:

    ```shell
    git pull --ff upstream master
    ```


## <a name="commit"></a> Commit Message Format

We have very precise rules over how our Git commit messages must be formatted.
This format leads to **easier to read commit history**.

Each commit message consists of a **header**, a **body**, and a **footer**.


```
<header>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The `header` is mandatory.

The `body` is mandatory for all commits except for those of scope "docs".
When the body is required it must be at least 20 characters long.

The `footer` is optional.

Any line of the commit message cannot be longer than 100 characters.


[coc]: https://github.com/smithg09/nodejs-typescript-graphql-starter/blob/master/CODE_OF_CONDUCT.md
[dev-doc]: https://documenter.getpostman.com/view/9636093/T1DpDdHt?version=latest
[github]: https://github.com/smithg09/nodejs-typescript-graphql-starter/
