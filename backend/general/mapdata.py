from rich import print
import osmnx as ox
import geopandas as gpd
import pandas as pd
import matplotlib.pyplot as plt
from shapely.geometry import Point, LineString

placeName = "London Borough of Hammersmith and Fulham"

# lengthen path between CRIME coordinates
def alter_length_between_coords(graph, latitude_s, longitude_s, latitude_t, longitude_t):
    # set source and target coords
    s_coords = Point(longitude_s, latitude_s)
    t_coords = Point(longitude_t, latitude_t)

    # find nodes closest to desired coordinates
    closest_source_node = ox.nearest_nodes(G=graph, X=s_coords.x, Y=s_coords.y)
    closest_target_node = ox.nearest_nodes(G=graph,X=t_coords.x, Y=t_coords.y)

    # find shortest path between the nodes
    cur_path = ox.shortest_path(graph, 
                         orig = closest_source_node, 
                         dest = closest_target_node, 
                         weight = "length")
    
    for u, v in zip(cur_path[:-1], cur_path[1:]):
        # Increase the length attribute for each edge by 5x
        graph[u][v][0]['length'] *= 5 
    
    return graph
    

# create point geoms for origin and destination (long, lat)
origin_point = Point(-0.21298, 51.48993)
destination_point = Point(-0.20610, 51.48719)


# create origin dataframe
origin =  gpd.GeoDataFrame(columns = ['name', 'geometry'], crs = 4326, geometry = 'geometry')
origin.at[0, 'name'] = 'origin'
origin.at[0, 'geometry'] = origin_point


# create destination dataframe
destination =  gpd.GeoDataFrame(columns = ['name', 'geometry'], crs = 4326, geometry = 'geometry')
destination.at[0, 'name'] = 'destination'
destination.at[0, 'geometry'] = destination_point


print("Creating graph from OSM Data")
graph = ox.graph_from_place(placeName, network_type='walk')


# find closest nodes to start and end coords
closest_origin_node = ox.nearest_nodes(G=graph, X=origin_point.x, Y=origin_point.y)
closest_destination_node = ox.nearest_nodes(G=graph,X=destination_point.x, Y=destination_point.y)


print("Editing crime paths")
# lengthen path between CRIME nodes
graph = alter_length_between_coords(graph=graph, latitude_s=51.48971, longitude_s=-0.20946, latitude_t=51.48705, longitude_t=-0.20777)

# find shortest path
shortest_path_nodes = ox.shortest_path(graph, 
                         orig = closest_origin_node, 
                         dest = closest_destination_node, 
                         weight = "length")


print("printing route data")
# plot base graph
# fig, ax = ox.plot_graph(graph, node_size=0.5, edge_linewidth=0.2)

# plot graph with shortest path showing
fig, ax = ox.plot.plot_graph_route(G=graph, route=shortest_path_nodes, node_size=0, route_color="g", edge_linewidth=0.2, orig_dest_size=100)


plt.show()
