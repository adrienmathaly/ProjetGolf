/**   \author Adrien ORTOLA */
package http.users;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map.Entry;

/**
 * \class SetOfUsers
 * \brief The purpose of this class is to provide a general access to all the users' data
 * */
public class SetOfUsers {
	
	/** HashMap representing all the users, mapped by token id */
	private static HashMap<String,User> users;
	
	/** 
	 * \param none
	 * \return void
	 * \brief Initialize the general set of users.
	 * */
	public static void prepareUsers(){
		users=new HashMap<String,User>();
	}
	
	/** 
	 * \param String token, User user
	 * \return void
	 * \brief insert a new user into the general set of users
	 * */
	public static void addUser(String token,User user){
		users.put(token,user);
	}
	
	/** 
	 * \param Strign token
	 * \return void
	 * \brief Set a specific user to deconnected, meaning he/she is out of game
	 * */
	public static void disconnectUser(String token){
		users.get(token).setConnected(false);
	}
	
	/** 
	 * \param String token
	 * \return void
	 * \brief fully remove a specific user from the general set of users
	 * */
	public static void removeUser(String token){
		users.remove(token);
	}
	
	/** 
	 * \param none
	 * \return int
	 * \brief returns the amount of all users from the beginning (even the disconnected ones)
	 * */
	public static int amountOfUsers(){
		return users.size();
	}
	
	/** 
	 * \param none
	 * \return int
	 * \brief returns the total number of active games
	 * */
	public static int numberOfActiveGames(){
		int i=0;
		for(Entry<String, User> e : users.entrySet()){
			if(e.getValue().isConnected()){
				i++;
			}
		}
		return i;
	}
	
	/** 
	 * \param none
	 * \return float
	 * \brief returns the total of all the users' summed distances
	 * */
	public static float totalOfAllDistances(){
		float i=0;
		for(Entry<String, User> e : users.entrySet()){
			if(e.getValue().isFullyCreated()){
				i=i+e.getValue().getTraveledDistance();
			}
		}
		return i;
	}
	
	/** 
	 * \param none
	 * \return LinkedList<Float>
	 * \brief Returns a list of the users' distances
	 * */
	public static LinkedList<Float> listOfDistances(){
		LinkedList<Float> listOfDistances=new  LinkedList<Float>();
		for(Entry<String, User> e : users.entrySet()){
			if(e.getValue().isFullyCreated()){
				listOfDistances.add(e.getValue().getTraveledDistance());
			}
		}
		return listOfDistances;
	}
	
	/** 
	 * \param none
	 * \return LinkedList<Point>
	 * \brief Returns a list of the users' coordinates
	 * */
	public static LinkedList<Point> listOfCoordinates(){
		LinkedList<Point> listOfCoordinates=new  LinkedList<Point>();
		for(Entry<String, User> e : users.entrySet()){
			if(e.getValue().isFullyCreated()){
				listOfCoordinates.add(new Point(e.getValue().getLatitude(),e.getValue().getLongitude()));
			}
		}
		return listOfCoordinates;
	}
	
	
	/** 
	 * \param none
	 * \return LinkedList<Quadruplet>
	 * \brief Returns a list of every personal statistics of each fully created user
	 * */
	public static LinkedList<Quadruplet> listOfEveryStats(){
		LinkedList<Quadruplet> listOfEveryStats=new  LinkedList<Quadruplet>();
		for(Entry<String, User> e : users.entrySet()){
			if(e.getValue().isFullyCreated()){
				listOfEveryStats.add(new Quadruplet(e.getValue().getLatitude(),e.getValue().getLongitude(),e.getValue().getTraveledDistance(),e.getValue().isConnected()));
			}
		}
		return listOfEveryStats;
	}
	
	/** 
	 * \param String token, Point ballPoint, Point newPoint
	 * \return void
	 * \brief Update the user's location and the raw coordinates of his/her newly shot ball
	 * */
	public static void updateUserLocation(String token, Point ballPoint, Point newPoint){
		User MrNobody = users.get(token) ;
		MrNobody.setTraveledDistance(MrNobody.getTraveledDistance()+newPoint.distanceBetweenMeAnd(MrNobody.getLocation()));
		MrNobody.setLocation(newPoint);
		MrNobody.setBallLocation(ballPoint);
	}
	
	/** 
	 * \param String token, Point firstPoint
	 * \return void
	 * \brief set the first location of a specific user
	 * */
	public static void setFirstLocationOf(String token, Point firstPoint){
		User MrNobody = users.get(token) ;
		MrNobody.setTraveledDistance(0);
		MrNobody.setLocation(firstPoint);
		MrNobody.setFullyCreated(true);
	}
	
	/** 
	 * \param String token
	 * \return boolean
	 * \brief verifies if a user is fully created, meaning the mandatory information are filled
	 * */
	public static boolean isUserFullyCreated(String token){
		return users.get(token).isFullyCreated();
	}
	
	/** 
	 * \param none
	 * \return Float
	 * \brief returns the best distance among all the users
	 * */
	public static Float getBestDistance(){
		Float maxDist=0.0f;
		for(Entry<String, User> e : users.entrySet()){
			if(e.getValue().isFullyCreated()){
				if(maxDist<e.getValue().getTraveledDistance()){
					maxDist=e.getValue().getTraveledDistance();
				}
			}
		}
		return maxDist;
	}
	
	/** 
	 * \param String token
	 * \return boolean
	 * \brief verifies the existence of a user
	 * */
	public static boolean containsToken(String token){
		return users.containsKey(token);
	}
	
	/** 
	 * \param String token
	 * \return Point
	 * \brief returns the last location of a specific user
	 * */
	public static Point getLastLocationOf(String token){
		return users.get(token).getLocation();
	}
}
