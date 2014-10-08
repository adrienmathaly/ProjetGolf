/**   \author Adrien ORTOLA */
package http.servers;

import http.handlers.mobile.BindTokenId;
import http.handlers.mobile.EraseId;
import http.handlers.mobile.LastLocation;
import http.handlers.mobile.Shot;

/**
 * \class HTTPGolfMobileServer
 * \brief The purpose of this class is to handle the requests of the mobile clients
 * */
public class HTTPGolfMobileServer extends HTTPGolfServer{

	/** 
	 * \param String name, String port
	 * \return void
	 * \brief Constructor.
	 * */
	public HTTPGolfMobileServer(String name ,String port) {
		super(name, port);
	}

	/** 
	 * \param none
	 * \return void
	 * \brief Creates a context for each URL to be handled, binding them with a dedicated object.
	 * */
	@Override
	protected void createMultiEntriesContext() {
		getServer().createContext("/token", new BindTokenId());
		getServer().createContext("/shot", new Shot());
		getServer().createContext("/eraseid", new EraseId());
		getServer().createContext("/lastlocation", new LastLocation());
	}
}
