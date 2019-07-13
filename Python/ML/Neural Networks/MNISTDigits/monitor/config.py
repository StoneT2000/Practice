import atexit

logpath = ""
class initialize():

    # Handle preemptive exits
    logpath
    def __init__(self, logpathgiven):
        global logpath
        logpath = logpathgiven
        f=open(logpath,"w+")
        f.write("[{\"config\":\"3\"}]")
        f.close()
        def closeJsonLog():
            f=open(logpath,"a+")
            size=f.tell()
            if size > 2:
                f.truncate(size-1)
                f.write("]")
            f.close()
        atexit.register(closeJsonLog)

    # Add a graph for displaying on the dashboard
    # Displays metrics being watched on to this graph, data to be written to local logs file
    class graph():
        metrics = []
        data_config = {}
        name = ""
        def __init__(self):
            self.logpath = logpath
            pass
        def add_metrics(self, **options):
            for arg in options:
                if arg == 'name':
                    print(("Adding graph \"%s\"") % (options[arg]))
                    self.name = options[arg]
                elif arg == 'keys':
                    # The keys to watch for
                    if 'x' in options[arg] :
                        exit("Syntax Error: Cannot use \"x\" as a key/name for a metric to be recorded")
                    print("Watch Keys (Metrics): ",options[arg])
                    self.metrics = options[arg];
                elif arg == 'xLabel':
                    pass
                elif arg == 'yLabel':
                    pass
                elif arg == 'data_config':
                    # Configuration of the display of the keys being watched
                    print("Data Config: ",options[arg])
                    self.data_config = options[arg]
        # Add data point(s) to the graph, to then be written to the json log
        # Expects data provided to be under the keys defined in metrics list
        def add_data(self, **options):
            try:
                options['data_y']
            except KeyError:
                exit("\nSyntax Error: Missing data_y key when adding data using add_data to graph \"" + self.name + "\"")
            try:
                options['data_x']
            except KeyError:
                exit("\nSyntax Error: Missing data_x key when adding data using add_data() to graph \"" + self.name + "\"")
            '''
            if len(options['data_x']) != len(options['data_y']) :
                exit("\nSyntax Error: data_x and data_y keys must be of the same length when adding data using add_data() to graph \"" + self.name + "\"")
            '''
            # If user provides a single value as argument for data_y
            if type(options['data_x']) is list:
                for i in range(len(options['data_x'])):
                    with open(self.logpath, "a") as f:
                        size=f.tell()
                        f.truncate(size-1) # delete the bracket
                        if f.tell() > 2:
                            f.write(",")
                        arr = [("\"x\":\"%f\"") % (options['data_x'][i])]
                        for metricKey in self.metrics:
                            arr.append(("\"%s\"") % (metricKey) + (":\"%f\"") % (options['data_y'][metricKey][i]))
                        f.write("{" + (",").join(arr) + "}]")
                        f.close() # close the file
            elif type(options['data_x']) is int:
                with open(self.logpath, "a") as f:
                    size=f.tell()
                    f.truncate(size-1) # delete the bracket
                    if f.tell() > 2:
                        f.write(",")
                    f.write("{" + ("\"x\":\"%f\"") % (options['data_x']) + ",")
                    arr = []
                    for metricKey in self.metrics:
                        arr.append(("\"%s\"") % (metricKey) + (":\"%f\"") % (options['data_y'][metricKey]))
                    f.write((",").join(arr) + "}]")
                    f.close() # close the file
    def addGraph(**options):
        for arg in options:
            if arg == 'name':
                print(("Adding graph \"%s\"") % (options[arg]))
            elif arg == 'keys':
                # The keys to watch for
                print("Watching the following Keys/Metrics: ", options[arg])
            elif arg == 'xLabel':
                pass
            elif arg == 'yLabel':
                pass
            elif arg == 'data_config':
                # Configuration of the display of the keys being watched
                print("Data Config: ",options[arg])
