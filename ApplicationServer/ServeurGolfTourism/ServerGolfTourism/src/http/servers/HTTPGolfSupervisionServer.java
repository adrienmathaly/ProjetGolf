/**   \author Adrien ORTOLA */
package http.servers;

import http.handlers.supervision.AllTheData;
import http.handlers.supervision.AmountOfUsersFromDaBeginnin;
import http.handlers.supervision.BestDistance;
import http.handlers.supervision.NumberOfActiveGames;
import http.handlers.supervision.TotalOfAllDistances;
import http.handlers.supervision.UsersLastKnownLocations;
import http.handlers.supervision.UsersTraveledDistances;

/**
 * \class HTTPGolfSupervisionServer
 * \brief The purpose of this class is to handle the requests of the web supervision clients
 *  */
public class HTTPGolfSupervisionServer extends HTTPGolfServer {

	/** 
	 * \param String name, String port
	 * \return void
	 * \brief Constructor.
	 * */
	public HTTPGolfSupervisionServer(String name, String port) {
		super(name, port);
	}

	/** 
	 * \param none
	 * \return void
	 * \brief Creates a context for each URL to be handled, binding them with a dedicated object.
	 * */
	@Override
	protected void createMultiEntriesContext() {
		getServer().createContext("/users/lastKnownLocations", new UsersLastKnownLocations());
		getServer().createContext("/users/travelledDistances", new UsersTraveledDistances());
		getServer().createContext("/amountOfUsers", new AmountOfUsersFromDaBeginnin());
		getServer().createContext("/totalDistances", new TotalOfAllDistances());
		getServer().createContext("/numberOfConnected", new NumberOfActiveGames());
		getServer().createContext("/bestDistance", new BestDistance());
		getServer().createContext("/all", new AllTheData());
	}
}
