'use strict';

import {
    assert,
    fetchToken,
    getUser,
    setButtonWaitState,
    showPage
} from "./main.mjs";

const elements = {
    signedInPage: document.querySelector('#signed-in-page'),
    signInForm: document.querySelector('form.sign-in'),
    signInPage: document.querySelector('#sign-in-page'),
    signInButton: document.querySelector('button#sign-in-submit'),
    signOutButton: document.querySelector('button#sign-out'),
    signUpLink: document.querySelector('a#sign-up-link'),
};

function reload() {
    location.reload();
}

function submitSignIn(e) {
    e.preventDefault();
    setButtonWaitState(elements.signInButton, true);

    const email = document.querySelector('form.sign-in #email').value;
    const password = document.querySelector('form.sign-in #password').value;
    fetchToken(email, password).then(response => {
        console.log(response);
        const username = response.username;
        const token = response.token;

        browser.storage.sync.set({
            username: response.username,
            token: response.token,
        }).then(reload);
    }).catch(error => {
        console.error(error);
    });
}

function signOut() {
    // Kind of unnecessary because sign out is pretty much instant. But just in case Google does something
    // weird.
    setButtonWaitState(elements.signOutButton, true);
    browser.storage.sync.clear().then(reload);
}

export function initOptions() {
    for (let [key, value] of Object.entries(elements)) {
        assert(value, `${key} not found`);
    }

    elements.signInForm.addEventListener('submit', submitSignIn);
    elements.signOutButton.addEventListener('click', signOut);
    elements.signUpLink.href = `https://login.screenlyapp.com/sign-up?next=${window.location.href}`

    getUser().then((user) => {
        if (user.username) {
            document.querySelector('#signed-in-page .username').textContent = user.username;
            showPage(elements.signedInPage);
            console.info(user);
        } else {
            showPage(elements.signInPage);
        }
    });
}