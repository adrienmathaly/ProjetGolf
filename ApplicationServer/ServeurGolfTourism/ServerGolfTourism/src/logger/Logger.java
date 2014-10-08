/**   \author Adrien ORTOLA */
package logger;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map.Entry;

/**
 * \class Logger
 * \brief Implements Runnable.
 * The purpose of this class is to provide a general logging system.
 * */
public class Logger implements Runnable{

	/** The name of the logger */
	private String loggerName;
	/** path where to actually log */
	private String path;
	/** waiting list of logs to be written by the current logger */
	private LinkedList<String> logsToBeWritten;
	/** activity status of the current logger */
	private boolean loggerActive;
	/** Interval of writing between two logs */
	private long interval;
	/** A writer */
	private PrintWriter out;
	/** pattern of the date being logged */
	private SimpleDateFormat dateFormat;
	/** general set of loggers mapped by name */
	private static HashMap<String,Logger> loggers;
	
	/** 
	 * \param String loggerName, String path, long interval
	 * \return void
	 * \brief Constructor.
	 * Initialize everything + insert the fresh logger into the set of loggers
	 * */
	public Logger(String loggerName, String path, long interval) {
		this.loggerName = loggerName;
		this.path = path;
		this.logsToBeWritten = new LinkedList<String>();
		this.loggerActive = false;
		this.interval = interval;
		this.dateFormat = new SimpleDateFormat("dd/MM/yyyy - HH:mm:ss");
		loggers.put(loggerName, this);
	}

	/** 
	 * \param none
	 * \return void
	 * \brief Starts the current logger. While active, the logger is to write logs extracted from their own queue
	 * */
	public void startLogger() {
		if (!loggerActive) {
			loggerActive = true;
			while (loggerActive) {
				if ((!logsToBeWritten.isEmpty())) {
					writeAwaitingLog();
				}
				try {
					Thread.sleep(interval);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
		}
	}

	/** 
	 * \param none
	 * \return void
	 * \brief Stops an active logger. Forever.
	 * */
	public void stopLogger() {
		setLoggerActive(false);
	}

	/** 
	 * \param none
	 * \return void
	 * \brief Writes into the log file, the awaiting logs, following a particular pattern
	 * */
	private void writeAwaitingLog() {
		String currentDate = dateFormat.format(new Date());
		try {
			out = new PrintWriter(new BufferedWriter(new FileWriter(path,true)));
			out.println("[" + loggerName + "] " + currentDate + " "+ logsToBeWritten.poll());
			out.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	/** 
	 * \param none
	 * \return void
	 * \brief Forgotten mandatory run method that just starts the logger -_-"
	 * */
	@Override
	public void run() {
		startLogger();
	}

	/** 
	 * \param String logger,String log
	 * \return void
	 * \brief add a log in a specific queue
	 * */
	public static void addLogToBeWritten(String logger,String log) {
		loggers.get(logger).logsToBeWritten.add(log);
	}

	/** 
	 * \param none
	 * \return void
	 * \brief initialize the loggers.
	 * */
	public static void prepareLoggers(){
		loggers=new HashMap<String,Logger>();
	}
	
	/** 
	 * \param Logger newLogger
	 * \return void
	 * \brief insert a fresh logger into the general set of loggers
	 * */
	public static void createLogger(Logger newLogger){
		loggers.put(newLogger.getLoggerName(), newLogger);
	}
	
	/** 
	 * \param none
	 * \return void
	 * \brief Starts all the loggers in the general set
	 * */
	public static void startAllLoggers(){
		for(Entry<String,Logger> e : loggers.entrySet()){
			Thread t = new Thread(e.getValue());
			t.start();
		}
	}
	
	/** 
	 * \param none
	 * \return void
	 * \brief Ends all loggers in the general set
	 * */
	public static void killAllloggers(){
		for(Entry<String,Logger> e : loggers.entrySet()){
			e.getValue().stopLogger();
		}
	}
	
	/** 
	 * \param none
	 * \return String
	 * \brief returns the name of the current logger
	 * */
	public String getLoggerName() {
		return loggerName;
	}

	/** 
	 * \param String logger
	 * \return void
	 * \brief sets the name of the current logger
	 * */
	public void setLoggerName(String loggerName) {
		this.loggerName = loggerName;
	}

	/** 
	 * \param none
	 * \return String
	 * \brief returns the path of the current logger's log file
	 * */
	public String getPath() {
		return path;
	}

	/** 
	 * \param String path
	 * \return void
	 * \brief sets the path of the current logger's log file
	 * */
	public void setPath(String path) {
		this.path = path;
	}

	/** 
	 * \param none
	 * \return boolean
	 * \brief verifies the activity status of the current logger
	 * */
	public boolean isLoggerActive() {
		return loggerActive;
	}

	/** 
	 * \param boolean loggerActive
	 * \return void
	 * \brief sets the activity status of the current logger
	 * */
	public void setLoggerActive(boolean loggerActive) {
		this.loggerActive = loggerActive;
	}

	/** 
	 * \param none
	 * \return long
	 * \brief returns the writing interval of the current logger
	 * */
	public long getInterval() {
		return interval;
	}

	/** 
	 * \param long interval
	 * \return void
	 * \brief sets the writing interval of the current logger
	 * */
	public void setInterval(long interval) {
		this.interval = interval;
	}

	/** 
	 * \param none
	 * \return SimpleDateFormat
	 * \brief returns the date pattern of the logging system
	 * */
	public SimpleDateFormat getDateFormat() {
		return dateFormat;
	}

	/** 
	 * \param SimpleDateFormat dateFormat
	 * \return void
	 * \brief sets the date pattern of the current logger
	 * */
	public void setDateFormat(SimpleDateFormat dateFormat) {
		this.dateFormat = dateFormat;
	}
}
