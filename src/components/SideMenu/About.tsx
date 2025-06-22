import type {FunctionComponent} from "react";
import {CloseButton, Dialog, Heading, IconButton, Link, Portal, Stack, Text} from "@chakra-ui/react";
import {TbExternalLink, TbInfoSmall} from "react-icons/tb";

export const About: FunctionComponent = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <IconButton colorPalette="gray" variant="outline" size="lg">
          <TbInfoSmall />
        </IconButton>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title fontSize="xl">Impressum</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Heading fontSize="md">Haftungsausschluss</Heading>
              <Text fontSize="xs" mb="1">
                Diese App zeigt historische Daten an, die von <Link variant="underline" href="https://en.wikipedia.org/wiki/Main_Page" target="_blank">Wikipedia<TbExternalLink/></Link> und <Link variant="underline" href="https://www.wikidata.org/wiki/Wikidata:Main_Page" target="_blank">Wikidata<TbExternalLink/></Link> bezogen werden. Die Inhalte sind öffentlich zugänglich und werden von der Community gepflegt.
                Es wird keine Gewähr für die Richtigkeit, Vollständigkeit oder Aktualität der dargestellten Daten übernommen.
              </Text>
              
              <Heading mt="20px" fontSize="md">Dienste Dritter</Heading>
              <Text fontSize="xs" mb="1">
                Kartendaten und -stile können auf externe Anbieter (OpenStreetMap, Esri, Leaflet) zurückgreifen. Diese Dienste können Nutzungsdaten gemäß ihren eigenen Datenschutzrichtlinien verarbeiten.
              </Text>
              
              <Heading mt="20px" fontSize="md">Datenschutzerklärung</Heading>
              <Text fontSize="xs" mb="1">
                Diese App erhebt oder speichert <strong>keine</strong> personenbezogenen Daten. Es werden keine Nutzerprofile erstellt und keine Tracking-Tools verwendet.
                Sollte sich dies in zukünftigen Versionen ändern, wird die Datenschutzerklärung entsprechend aktualisiert.
              </Text>
              
              <Heading mt="20px" fontSize="md">Haftung für Inhalte</Heading>
              <Text fontSize="xs" mb="1">
                Gemäß §§ 8 bis 10 TMG bin ich als Diensteanbieter nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
              </Text>
              
              <Heading mt="20px" fontSize="md">Nutzungsrechte des Favicons</Heading>
              <Text fontSize="xs" mb="1">
                Das Favicon dieser Seite basiert auf der Grafik <code>1f3db.svg</code> aus dem Twitter-Twemoji-Projekt. Diese Grafik steht unter der <Link variant="underline" href="https://creativecommons.org/licenses/by/4.0/" target="_blank">Creative Commons BY 4.0 Lizenz</Link>, © 2020 Twitter, Inc. und weitere Mitwirkende.
              </Text>
              <Text fontSize="xs" mb="1">
                Die Originaldatei ist hier verfügbar: <Link variant="underline" href="https://github.com/twitter/twemoji/blob/master/assets/svg/1f3db.svg" target="_blank">twemoji GitHub-Repository</Link>.
              </Text>
              
              <Heading mt="20px" fontSize="md">Angaben gemäß § 5 TMG</Heading>
              <Stack my="1">
                <Text fontSize="xs">Sönke Schaarschmidt</Text>
                <Text fontSize="xs">Stockholmer Straße 1.</Text>
                <Text fontSize="xs">13359, Berlin</Text>
                <Text fontSize="xs">Deutschland</Text>
                <Text fontSize="xs">Email: soenke.schaarschmidt@gmail.com</Text>
              </Stack>
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
