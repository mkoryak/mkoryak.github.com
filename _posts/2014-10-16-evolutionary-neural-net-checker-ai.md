---
layout: post
title: "Evolutionary Neural Net Checker AI"
description: "Written in 2006, don't judge"
category: code
---
{% include JB/setup %}


A neural network based minimax checker AI that is generated using an evolutionary algorithm.


The Neural Network Checker AI was a semester long final project for a graduate evolutionary computation class I took in 2006.
I worked on a team with Ari Packer to complete this project. Dan Dumont also provided a "hard" checker AI which we used to train against


This project was based on a 2001 publication by Chellapilla K and Fogel DB (2001) "Evolving an Expert Checkers Playing Program without Using Human Expertise".
That paper can be found [here](http://www.natural-selection.com/publications_2001.html)


How The Program Works
=====================
To create an intelligent checkers player, Fogel used an alpha-beta algorithm with a neural network to evaluate the worth of
each leaf.  A population of these strategies (a term Fogel uses to describe a neural network's weights and biases and as
well as a king value K) was then evolved to produce an intelligent board evaluator.  Each strategy's fitness was
calculated by having the strategies compete. The worst performing strategies were then purged from the population and
replaced by mutated copied of the remaining strategies. A ply depth of four, which constitutes two moves per player,
was used when matching the strategies against each other, and a ply depth of eight was used when testing a strategy.
Strategies were tested against human players on the Microsoft Gaming Zone as well as against a version of Chinook which had a reduced difficulty.

Code
====
[on github](https://github.com/mkoryak/Evolutionary-Neural-Net-Checker-AI)

Play the AI
===========

This Applet was written in 2006, probably in java 1.4 and might require that version to run ;) Good luck!


<applet
	code="crapplet.CheckerFrameApplet"
	archive="http://programmingdrunk.com/past-projects/2006/checkerNN/NNApplet2.jar"
	id="CheckerFrameApplet"

	style="width:600px; height:650px; align:center;" >
	<param name="number_of_AIs" value="3"> <!-- number of AIs to load, must be the same as number loaded here -->
	<param name="AI_name_0" value="Fogel 4 Ply"> <!-- must start with 0, and end in (number_of_AIs - 1) Think arrays  -->
	<param name="AI_URL_0" value="http://programmingdrunk.com/past-projects/2006/checkerNN/fogelgen123.nnp">
	<param name="AI_name_1" value="Fogel 2 Ply">
	<param name="AI_URL_1" value="http://programmingdrunk.com/past-projects/2006/checkerNN/weaker.nnp">
	<param name="AI_name_2" value="Fogel 3 Ply">
	<param name="AI_URL_2" value="http://programmingdrunk.com/past-projects/2006/checkerNN/fogelgen180.nnp">
</applet>