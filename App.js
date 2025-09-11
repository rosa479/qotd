import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Share, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [quoteData, setQuoteData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getQuote = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://stoic.tekloon.net/stoic-quote');
      const data = await response.json();
      setQuoteData(data.data);
    } catch (error) {
      console.error("Error fetching quote:", error);
      Alert.alert("Error", "Failed to fetch a new quote.");
    } finally {
      setIsLoading(false);
    }
  };

  const shareQuote = async () => {
    if (!quoteData) return;
    try {
      await Share.share({
        message: `"${quoteData.quote}" - ${quoteData.author}`,
      });
    } catch (error) {
      console.error("Error sharing quote:", error);
      Alert.alert("Error", "Failed to share the quote.");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>Quote of the day</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: colors.mauve }]}
          onPress={getQuote} 
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>Get Inspired</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: colors.green }]}
          onPress={shareQuote}
          disabled={!quoteData}
        >
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color={colors.lavender} style={{ marginTop: 20 }} />
      ) : (
        quoteData && (
          <View style={styles.quoteContainer}>
            <Text style={styles.quoteContent}>"{quoteData.quote}"</Text>
            <Text style={styles.quoteAuthor}>- {quoteData.author}</Text>
          </View>
        )
      )}
    </View>
  );
}

const colors = {
    base: '#24273a',
    mantle: '#1e2030',
    crust: '#181926',
    text: '#cad3f5',
    subtext1: '#b8c0e0',
    overlay2: '#939ab7',
    surface0: '#363a4f',
    blue: '#8aadf4',
    lavender: '#b7bdf8',
    mauve: '#c6a0f6',
    green: '#a6da95',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.base,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: colors.blue,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 10,
  },
  button: {
    flex: 1, 
    marginHorizontal: 10, 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.crust, 
    fontSize: 16,
    fontWeight: 'bold',
  },
  quoteContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: colors.mantle,
    borderRadius: 10,
    borderColor: colors.surface0,
    borderWidth: 1,
    width: '100%',
  },
  quoteContent: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    color: colors.text,
  },
  quoteAuthor: {
    fontSize: 16,
    textAlign: 'right',
    marginTop: 10,
    color: colors.lavender,
  },
});
