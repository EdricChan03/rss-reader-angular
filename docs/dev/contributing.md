# Contributing

To begin contributing to the app, follow either one of these methods:

## Method #1

Apply at the `Send Feedback` Google form, available under the sidenav.

It's at the last section of the whole form.

## Method #2

**NOTE:** The following code snippets are for macOS.

1. Click on the fork button at the [app's repo](https://github.com/Chan4077/rss-reader) to make a copy of the repo.
2. In your terminal, type the following code:

    <!-- start-enclose-content -->
    ```bash
    cd ~/Desktop # Or whatever place you would like the clone project to be placed at
    git clone https://github.com/<your-username>/rss-reader.git
    ```
    <!-- end-enclose-content -->

3. It should clone the project locally onto your desktop. In your terminal (once again), type the following code:

    <!-- start-enclose-content -->
    ```bash
    cd rss-reader
    npm install # Installs all the dependencies
    gulp docs # To create documentation
    ng serve
    ```
    <!-- end-enclose-content -->
4. Changes you make will be saved live.
5. Once you're done making changes, commit the change with Git and push to your fork.

Done!
