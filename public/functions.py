    """ when = time.time()
    # unix epoch time is fine, but we dont want the milliseconds
    when_short = str(when).split('.')[0]
    firebase_values = {when_short: values} """


def send_to_firebase(db, app, values, id):
    sequence_state = open("sequence.txt", "r")
    sequence = sequence_state.readline()
    sequence_state.close()
    firebase_values = {sequence: values}
    print(f"Send to firebase! - {firebase_values}")
    db.collection("sensor-data").document(id).update(firebase_values)
    current_seq = int(sequence)
    current_seq += 1
    sequence_state = open("sequence.txt", "w")
    sequence_state.write(str(current_seq))
    sequence_state.close()