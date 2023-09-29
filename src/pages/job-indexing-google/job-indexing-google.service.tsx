import axios from 'axios';
import { get } from 'src/core/http';
import { config } from 'src/config';

export const getJobPageURIs = async () => {
  const appURL = config.appBaseURL;
  let page = 1;
  let result: string[] = [];

  do {
    const test = await get(`projects?status=ACTIVE&page=${page}`).then(({ data }) => {
      return data.items.map((i) => `${appURL}job-datails/${i.id}`);
    });
    result = result.concat(test);
    page += 1;
  } while (result.length > 0 && page <= 3);

  return result;
};

export function oauthSignIn() {
  // Google's OAuth 2.0 endpoint for requesting an access token
  var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

  // Create <form> element to submit parameters to OAuth 2.0 endpoint.
  var form = document.createElement('form');
  form.setAttribute('method', 'GET'); // Send as a GET request.
  form.setAttribute('action', oauth2Endpoint);

  // Parameters to pass to OAuth 2.0 endpoint.
  var params = {
    client_id: config.webTokenClientId,
    redirect_uri: config.webTokenRedirectURL,
    response_type: 'token',
    scope: 'https://www.googleapis.com/auth/indexing',
    include_granted_scopes: 'true',
    state: 'pass-through value',
  };

  // Add form parameters as hidden input values.
  for (var p in params) {
    var input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', p);
    input.setAttribute('value', params[p]);
    form.appendChild(input);
  }

  // Add form to page and submit it to open the OAuth 2.0 endpoint.
  document.body.appendChild(form);
  form.submit();
}

export const indexPageUrls = async (token: string) => {
  const batch = await getJobPageURIs();
  batch.map(async (item) => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    axios.post(
      'https://indexing.googleapis.com/v3/urlNotifications:publish',
      {
        url: item,
        type: 'URL_UPDATED',
      },
      { headers }
    );
  });
};
