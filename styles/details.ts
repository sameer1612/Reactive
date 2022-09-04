import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  title: {
    color: 'maroon',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 12,
    textTransform: 'capitalize',
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  edit: {
    marginTop: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255,0,0,0.1)',
    borderRadius: 6,
  },
  editText: {
    color: 'maroon',
  },
  input: {
    fontSize: 18,
    width: 320,
    textAlignVertical: 'top',
    padding: 8,
    borderColor: 'maroon',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 6,
  },
  fab: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'rgba(255,0,0,0.65)',
    borderColor: 'transparent',
    borderRadius: 100,
  },
});
