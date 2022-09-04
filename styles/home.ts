import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
  },
  input: {
    marginVertical: 24,
    fontSize: 18,
    padding: 8,
    borderColor: 'maroon',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 6,
  },
  todoCard: {
    padding: 8,
    marginBottom: 8,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 0, 0, 0.03)',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  todoTitle: {
    textTransform: 'capitalize',
    marginLeft: 4,
    flex: 1,
    color: 'maroon',
  },
  doneBtn: {
    borderRadius: 50,
    width: 24,
    marginLeft: 4,
    height: 24,
    backgroundColor: 'rgba(255, 0, 0, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedToggleIcon: {
    color: 'ghostwhite',
  },
});
