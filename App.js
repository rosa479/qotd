import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Share } from 'react-native'; // Import Share
import { useState } from 'react';


export default function App() {
  const [quoteData, setQuoteData] = useState(null);

  const getQuote = async () => {
    console.log("Fetching a new quote...");
    try {
      const response = await fetch('https://stoic.tekloon.net/stoic-quote');
      const data = await response.json();
      console.log(data)
      setQuoteData(data.data);
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  const shareQuote = async () => {
    if (!quoteData) return;

    try {
      const result = await Share.share({
        message: `"${quoteData.quote}" - ${quoteData.author}`,
      });
    } catch (error) {
      console.error("Error sharing quote:", error);
      Alert.alert("Error", "Failed to share the quote.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quote of the day</Text>
      <StatusBar style="auto" />
      <View style={styles.buttonContainer}>
        <Button title="Fetch New Quote" onPress={getQuote} />
        <Button title="Share" onPress={shareQuote} disabled={!quoteData} />
      </View>
      {quoteData && (
        <View style={styles.quoteContainer}>
          <Text style={styles.quoteContent}>"{quoteData.quote}"</Text>
          <Text style={styles.quoteAuthor}>- {quoteData.author}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 10,
  },
  quoteContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quoteContent: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  quoteAuthor: {
    fontSize: 16,
    textAlign: 'right',
    marginTop: 10,
    color: '#555',
  },
});
