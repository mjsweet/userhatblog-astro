---
title: How to migrate an e-commerce website
description: Not all hosting and web development companies can migrate a website correctly. Here is my check-list.
date: "2018-03-01T11:25:17+11:00"
published: true
---

Recently I had a highly valued client decide to migrate web hosting to another web host provider. Unfortunately the process was extremely frustrating for my client and after a disastrous site migration they decided to return to using my services. This non-technical document is about everything that went wrong, and what should have happened for their migration to be a success. My hope is that anyone reading this document can avoid potential mistakes, and complete a successful migration away from an old web hosting company.

Initially when my client told me that they were moving on, I had a few concerns about their migration, mostly to do with the site being a live e-commerce site with orders coming in most the time. My general practice when clients decide to move on, is to **only** give them basic access to the server, so that the new hosting company can copy the files down via sftp and complete a full database backup. I rarely give information about how to migrate away from my server. The reason why is because other hosting companies may have different methods of migration that may conflict with any suggestions that I may make. So in order for no problems to come back to me, I rarely give any direction to my former client on how to migrate. For this reason as well, I take no responsibility for any issues that may arise if the following instructions are carried out by a third party.

## What can go wrong with a website migration?

| Potential Migration Pitfall  | What happened  |
|---|---|
| DNS is incorrectly configured for a seamless transition | My clients DNS took hours to propagate with orders going into both servers |
| Database backups are not refreshed when the new site goes live | My client at go–live found that two weeks of orders were missing on the new server
| Scripts are incorrectly configured on the new host | During the long two week migration, a major new security patch was issued for the cart but not installed
| SSL certificates are incorrectly installed or non-existent | My client had to instruct the developer to install SSL
| The new host has not thoroughly tested the migrated site on a staging server | Very little testing was completed, with missing orders not attended to |

### DNS migration issues

The developer involved in migrating my client to a new server did not know how to change the name servers at my clients current domain registrar for their domain name. For a successful migration this is DNS 101, and to be frank, should never have happened. Not only did the client have to update their domain settings, but they also had to do much research about DNS in order to do it. They spent hours trying to figure out how this could be done. My opinion is this; the person conducting the migration needs to guide them through the steps to change DNS hosting.

For my client this process was incredibly frustrating, the person conducting the migration even asked if their domain name could be moved from one registrar to another; the server hosting companies own domain registrar. Furthermore they wanted to do this live. So the actual migration was going to be done while transferring domain registrar's. Again, to be frank, I've never heard of this happening before, and would be fraught with problems.

In light of this, I have created a **website migration checklist** that I use on a regular basis to migrate websites onto my servers. This is not a definitive check list for complex hosting scenarios, and in its current format is more suited to websites that receive less than 500 visits per day and up to 40 to 50 orders.

## Website migration checklist:

#### Changing DNS hosting for my clients:

* create a new DNS zone with my DNS hosting provider ([Cloudflare](https://cloudflare.com))
* make an exact copy of the existing DNS records for my new client's domain (Cloudflare does this automatically)
* once satisfied that the new DNS records are correct I will instruct my new client to change name servers at their domain registrar
	1. find out first who the domain is registered with (Godaddy or other)
	2. I would then find instructions to change name servers for that registrar
	3. via a phone call, instruct my client step-by-step on how to change name servers
	4. I instruct my client where ever possible to refrain from making website updates until go-live
* once the name servers have been changed, I will wait 3 to 5 days to ensure that the domain name has propagated throughout the Internet
* This enables a very fast migration from the old server to the new server via a simple DNS record update

#### How to migrate files and databases:

* during this time I'll also make a file backup via bash (log into the server) or SFTP of the website files, and complete a full backup of any databases on their account
* I will then create a new web hosting account on their new server, and install all website files and also all databases
* I have an extremely good bash script that enables me to automate the backup of the site files and databases, copy them to the new server, then automatically install the site files and databases. This can happen on an average Wordpress site in around three minutes.
* If required, I will also purchase an SSL certificate and install it on the new server

#### How to test the website on the new server:

* I then update my hosts file on my computer to point at the new server where I will test the site to ensure that it works. This trick enables me to see the site on the new server where no one else on the Internet would be able to.
* I will then make any configuration changes that need to be made for the website to run correctly
* if enough time has passed between go–live and the database backups where orders have been made, I will complete a final database backup on the old server and restore those databases to the new server immediately before the final migration

#### Final DNS update and go–live:

* once I am satisfied that the migration of the site has been completed, then I will log into my DNS record for their domain name and point their website to the new server
* because I use a high quality DNS host with a any-cast DNS network (Cloudflare), I generally expect that the websites traffic will redirect to the new server within one minute.
* as a precaution, for live e-commerce sites I generally complete the final migration while people are sleeping, I also watch Google analytics real-time to see if there is anyone on the website
* for static websites where the content hasn't changed, I will complete the migration any time of the day

If the developer who attempted my clients migration had followed this process, then my client would be hosted on a new server, and I would no longer have the pleasure of hosting them.

Use this check list when you next conduct a migration to a new web hosting server.
