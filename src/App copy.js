import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import "@fontsource/josefin-sans";
import { API, Storage } from 'aws-amplify';
import {
  Button,
  Menu,
  MenuItem,
  Divider,
  Flex,
  Heading,
  Image,
  Text,
  TextField,
  View,
  withAuthenticator,
  ThemeProvider
} from '@aws-amplify/ui-react';

import { listNotes } from "./graphql/queries";
import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation,
} from "./graphql/mutations";
import HeroLayout1 from "./ui-components/HeroLayout1";
import NavBar from "./ui-components/NavBar";
import MarketingFooter from "./ui-components/MarketingFooter";


const earthyTheme = {
  name: "earthTheme",
  tokens: {
    fonts: {
      default: {
        variable: { value: '"Josefin Sans"' },
        static: { value: '"Josefin Sans"' },
      },
    },

    colors: {

      brand: {
        primary: {
          10: { value: "{colors.green.10}" },
          20: { value: "{colors.green.20}" },
          40: { value: "{colors.green.40}" },
          60: { value: "{colors.green.60}" },
          80: { value: "{colors.green.80}" },
          90: { value: "{colors.green.90}" },
          100: { value: "{colors.green.100}" },
        },
        secondary: {
          10: { value: "{colors.yellow.10}" },
          20: { value: "{colors.yellow.20}" },
          40: { value: "{colors.yellow.40}" },
          60: { value: "{colors.yellow.60}" },
          80: { value: "{colors.yellow.80}" },
          90: { value: "{colors.yellow.90}" },
          100: { value: "{colors.yellow.100}" },
        },
      },
    },
  },
};


const App = ({ signOut }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listNotes });
    const notesFromAPI = apiData.data.listNotes.items;
    await Promise.all(
      notesFromAPI.map(async (note) => {
        if (note.image) {
          const url = await Storage.get(note.name);
          note.image = url;
        }
        return note;
      })
    );
    setNotes(notesFromAPI);
  }


  async function createNote(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const image = form.get("image");
    const data = {
      name: form.get("name"),
      description: form.get("description"),
      image: image.name,
    };
    if (!!data.image) await Storage.put(data.name, image);
    await API.graphql({
      query: createNoteMutation,
      variables: { input: data },
    });
    fetchNotes();
    event.target.reset();
  }

  async function deleteNote({ id, name }) {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    await Storage.remove(name);
    await API.graphql({
      query: deleteNoteMutation,
      variables: { input: { id } },
    });
  }
  return (
    <ThemeProvider>
      <View className="App">


        <View as="form" margin="3rem 0" onSubmit={createNote}>
          {/*} <Flex direction="row" justifyContent="center">
          <TextField
            name="name"
            placeholder="Note Name"
            label="Note Name"
            labelHidden
            variation="quiet"
            required
          />
          <TextField
            name="description"
            placeholder="Note Description"
            label="Note Description"
            labelHidden
            variation="quiet"
            required
          />
          <View
            name="image"
            as="input"
            type="file"
            style={{ alignSelf: "end" }}
          />
          <Button type="submit" variation="primary">
            Create Note
          </Button>
        </Flex> */}
        </View>
        <NavBar width={"100vw"} />
        <HeroLayout1
          title={'East London Community Band'}
          headline={'New Members'}
          button={'Get Started'}
          description={'Welcome to our new member site.  Here you can add members to your account and manage attendance and pay membership fees.'}
          image={'https://static.wixstatic.com/media/ee0576_bf6c848cf4ae4059a16770b64136f266~mv2.png/v1/crop/x_199,y_0,w_1481,h_905/fill/w_694,h_424,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Christmas%202020%20%20Band.png'} width={"100vw"} />

        {/*} <Heading level={2}>Current Notes</Heading>
        <View margin="3rem 0">
          {notes.map((note) => (
            <Flex
              key={note.id || note.name}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Text variation="primary">
                {note.name}
              </Text>
              <Text as="span">{note.description}</Text>
              {note.image && (
                <Image
                  src={note.image}
                  alt={`visual aid for ${notes.name}`}
                  style={{ width: 400 }}
                />
              )}
              <Button variation="link" onClick={() => deleteNote(note)}>
                Delete note
              </Button>
            </Flex>
          ))}
        </View>
        <Button onClick={signOut}>Sign Out</Button>
              */}</View>
      <MarketingFooter align={'center'} img={'https://static.wixstatic.com/media/ee0576_f5a8145481604ef99ea186c9da35fa5f~mv2.png/v1/fill/w_251,h_160,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/ee0576_f5a8145481604ef99ea186c9da35fa5f~mv2.png'}
        copyright={'© 2022. All rights reserved. Registered charity: 1142255'} margin={'3em 0'} width={"100vw"} />
    </ThemeProvider >
  );
};

export default withAuthenticator(App);