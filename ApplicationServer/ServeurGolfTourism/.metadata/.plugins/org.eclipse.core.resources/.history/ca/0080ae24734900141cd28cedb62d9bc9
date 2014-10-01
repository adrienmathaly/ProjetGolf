package http;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.net.Socket;
import java.util.HashMap;

import logger.Logger;

abstract class CommunicationManager implements Runnable{

	private Socket clientSocket;
	private BufferedReader in;
	private BufferedWriter out;
	private HashMap<String,Logger> loggers;
	
	public CommunicationManager(Socket clientSocket, BufferedReader in ,BufferedWriter out, HashMap<String,Logger> loggers){
		this.clientSocket=clientSocket;
		this.setIn(in);
		this.setOut(out);
		this.loggers=loggers;
	}
	
	@Override
	public void run() {
	}

	public Socket getClientSocket() {
		return clientSocket;
	}

	public void setClientSocket(Socket clientSocket) {
		this.clientSocket = clientSocket;
	}

	public BufferedReader getIn() {
		return in;
	}

	public void setIn(BufferedReader in) {
		this.in = in;
	}

	public BufferedWriter getOut() {
		return out;
	}

	public void setOut(BufferedWriter out) {
		this.out = out;
	}

}
