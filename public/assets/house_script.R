##voting project: HOUSE
##install.packages('dplyr')
library(dplyr)

setwd('/Users/lindsaycarbonell/Documents/REPOS/uncontested-candidates/assets/priprecinct/house')
prec_2000 = read.csv('11072000_house.csv', header = T)
prec_2002 = read.csv('11052002_house.csv', header = T)
prec_2004 = read.csv('11022004_house.csv', header = T)
prec_2006 = read.csv('11072006_house.csv', header = T)
prec_2008 = read.csv('11042008_house.csv', header = T)
prec_2010 = read.csv('11022010_house.csv', header = T)
prec_2012 = read.csv('11062012_house.csv', header = T)

##cast cols as characters
prec_2000$contest <- as.character(prec_2000$contest)
prec_2000$choice <- as.character(prec_2000$choice)

prec_2002$contest <- as.character(prec_2002$contest)
prec_2002$choice <- as.character(prec_2002$choice)

prec_2004$contest <- as.character(prec_2004$contest)
prec_2004$choice <- as.character(prec_2004$choice)

prec_2006$contest <- as.character(prec_2006$contest)
prec_2006$choice <- as.character(prec_2006$choice)

prec_2008$contest <- as.character(prec_2008$contest)
prec_2008$choice <- as.character(prec_2008$choice)

prec_2010$contest <- as.character(prec_2010$contest)
prec_2010$choice <- as.character(prec_2010$choice)

prec_2012$contest <- as.character(prec_2012$contest)
prec_2012$choice <- as.character(prec_2012$choice)

##get contest to just be district number

##2000: 'HOUSE DISTRICT ##'
##2002: 'HOUSE DISTRICT (##)'
##2004, 2005: 'NC STATE HOUSE DISTRICT ###'

##select cols needed adn add district col
prec_2000_conv <- prec_2000 %>% ##NOT WORKING WILL HAVE TO DO DISTRICT COL MANUALLY
  select(choice, contest, party) %>%
  mutate(district = 11111111111)

prec_2002_conv <- prec_2002 %>%
  select(choice, contest, party) %>%
  mutate(contest, district = gsub("\\(|\\)", "", unlist(regmatches(contest, gregexpr('\\(.*?(\\d+).*\\)', contest)))))

prec_2004_conv <- prec_2004 %>%
  select(choice, contest, party) %>%
  mutate(contest, district = unlist(regmatches(contest, gregexpr('\\(?[0-9,.]+', contest))))

prec_2006_conv <- prec_2006 %>%
  select(choice, contest, party) %>%
  mutate(contest, district = unlist(regmatches(contest, gregexpr('\\(?[0-9,.]+', contest))))

prec_2008_conv <- prec_2008 %>%
  select(choice, contest, party) %>%
  mutate(contest, district = unlist(regmatches(contest, gregexpr('\\(?[0-9,.]+', contest))))

prec_2010_conv <- prec_2010 %>%
  select(choice, contest, party) %>%
  mutate(contest, district = unlist(regmatches(contest, gregexpr('\\(?[0-9,.]+', contest))))

prec_2012_conv <- prec_2012 %>%
  select(choice, contest, party) %>%
  mutate(contest, district = unlist(regmatches(contest, gregexpr('\\(?[0-9,.]+', contest))))
  
##remove duplicate rows to see contests
prec_2000_conv <- unique(prec_2000_conv)
prec_2002_conv <- unique(prec_2002_conv)
prec_2004_conv <- unique(prec_2004_conv)
prec_2006_conv <- unique(prec_2006_conv)
prec_2008_conv <- unique(prec_2008_conv)
prec_2010_conv <- unique(prec_2010_conv)
prec_2012_conv <- unique(prec_2012_conv)

##convert into a data frame
prec_2000_conv <- as.data.frame(prec_2000_conv)
prec_2002_conv <- as.data.frame(prec_2002_conv)
prec_2004_conv <- as.data.frame(prec_2004_conv)
prec_2006_conv <- as.data.frame(prec_2006_conv)
prec_2008_conv <- as.data.frame(prec_2008_conv)
prec_2010_conv <- as.data.frame(prec_2010_conv)
prec_2012_conv <- as.data.frame(prec_2012_conv)

##count candidates and add contested col
output_df_2000 <- dplyr::group_by(prec_2000_conv, contest) %>%
  dplyr::summarize(candidate_count = length(choice)) %>%
  dplyr::ungroup() %>%
  dplyr::mutate(year = 2000) %>%
  dplyr::mutate(contested = ifelse(candidate_count > 1, "Yes", "No"))

output_df_2002 <- dplyr::group_by(prec_2002_conv, contest) %>%
  dplyr::summarize(candidate_count = length(choice)) %>%
  dplyr::ungroup() %>%
  dplyr::mutate(year = 2002) %>%
  dplyr::mutate(contested = ifelse(candidate_count > 1, "Yes", "No"))

output_df_2004 <- dplyr::group_by(prec_2004_conv, contest) %>%
  dplyr::summarize(candidate_count = length(choice)) %>%
  dplyr::ungroup() %>%
  dplyr::mutate(year = 2004) %>%
  dplyr::mutate(contested = ifelse(candidate_count > 1, "Yes", "No"))

output_df_2006 <- dplyr::group_by(prec_2006_conv, contest) %>%
  dplyr::summarize(candidate_count = length(choice)) %>%
  dplyr::ungroup() %>%
  dplyr::mutate(year = 2006) %>%
  dplyr::mutate(contested = ifelse(candidate_count > 1, "Yes", "No"))

output_df_2008 <- dplyr::group_by(prec_2008_conv, contest) %>%
  dplyr::summarize(candidate_count = length(choice)) %>%
  dplyr::ungroup() %>%
  dplyr::mutate(year = 2008) %>%
  dplyr::mutate(contested = ifelse(candidate_count > 1, "Yes", "No"))

output_df_2010 <- dplyr::group_by(prec_2010_conv, contest) %>%
  dplyr::summarize(candidate_count = length(choice)) %>%
  dplyr::ungroup() %>%
  dplyr::mutate(year = 2010) %>%
  dplyr::mutate(contested = ifelse(candidate_count > 1, "Yes", "No"))

output_df_2012 <- dplyr::group_by(prec_2012_conv, contest) %>%
  dplyr::summarize(candidate_count = length(choice)) %>%
  dplyr::ungroup() %>%
  dplyr::mutate(year = 2012) %>%
  dplyr::mutate(contested = ifelse(candidate_count > 1, "Yes", "No"))



#merge output_df and prec_[year]
output_df_2000 <- merge(output_df_2000, prec_2000_conv, by.x="contest", by.y="contest")
output_df_2002 <- merge(output_df_2002, prec_2002_conv, by.x="contest", by.y="contest")
output_df_2004 <- merge(output_df_2004, prec_2004_conv, by.x="contest", by.y="contest")
output_df_2006 <- merge(output_df_2006, prec_2006_conv, by.x="contest", by.y="contest")
output_df_2008 <- merge(output_df_2008, prec_2008_conv, by.x="contest", by.y="contest")
output_df_2010 <- merge(output_df_2010, prec_2010_conv, by.x="contest", by.y="contest")
output_df_2012 <- merge(output_df_2012, prec_2012_conv, by.x="contest", by.y="contest")

##files with just uncontested
output_unc_2000 <- output_df_2000 %>%
  select(year, contest, candidate_count, contested, choice, party, district) %>%
  filter(contested == "No")

output_unc_2002 <- output_df_2002 %>%
  select(year, contest, candidate_count, contested, choice, party, district) %>%
  filter(contested == "No")

output_unc_2004 <- output_df_2004 %>%
  select(year, contest, candidate_count, contested, choice, party, district) %>%
  filter(contested == "No")

output_unc_2006 <- output_df_2006 %>%
  select(year, contest, candidate_count, contested, choice, party, district) %>%
  filter(contested == "No")

output_unc_2008 <- output_df_2008 %>%
  select(year, contest, candidate_count, contested, choice, party, district) %>%
  filter(contested == "No")

output_unc_2010 <- output_df_2010 %>%
  select(year, contest, candidate_count, contested, choice, party, district) %>%
  filter(contested == "No")

output_unc_2012 <- output_df_2012 %>%
  select(year, contest, candidate_count, contested, choice, party, district) %>%
  filter(contested == "No")



##write as a csv ALL
write.csv(output_df_2000, file = "all/all_2000.csv")
write.csv(output_df_2002, file = "all/all_2002.csv")
write.csv(output_df_2004, file = "all/all_2004.csv")
write.csv(output_df_2006, file = "all/all_2006.csv")
write.csv(output_df_2008, file = "all/all_2008.csv")
write.csv(output_df_2010, file = "all/all_2010.csv")
write.csv(output_df_2012, file = "all/all_2012.csv")

##merge all into one file
filenames <- paste('all/',list.files(path = "all/"),sep="")
all <- do.call("rbind", lapply(filenames, read.csv))
write.csv(all, file = "all/ALL.csv")


##write as csv UNCONTESTED
write.csv(output_unc_2000, file = "uncont/uncontested_2000.csv")
write.csv(output_unc_2002, file = "uncont/uncontested_2002.csv")
write.csv(output_unc_2004, file = "uncont/uncontested_2004.csv")
write.csv(output_unc_2006, file = "uncont/uncontested_2006.csv")
write.csv(output_unc_2008, file = "uncont/uncontested_2008.csv")
write.csv(output_unc_2010, file = "uncont/uncontested_2010.csv")
write.csv(output_unc_2012, file = "uncont/uncontested_2012.csv")

##merge uncontested into one file
##DOES NOT INCL WRITE-IN EXCEPTIONS
filenames_uncont <- paste('uncont/',list.files(path = "uncont/"),sep="")
all_uncont <- do.call("rbind", lapply(filenames_uncont, read.csv))
write.csv(all_uncont, file = "uncont/ALL_uncontested.csv")


