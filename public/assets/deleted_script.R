setwd('/Users/lindsaycarbonell/Documents/REPOS/uncontested-candidates')
results_2015 = read.csv('resultsPCT20151103.csv', header = T)

colnames(results_2015)

##PROBLEM: CAN'T FILTER CHOICE_PARTY BECAUSE IT ISN'T A STRING/CHAR

##changing colnames to have underscores
##colnames(results_2015) <- gsub("\\.","_",colnames(results_2015))
##data.frame(results_2015.conversions)
##colnames(results_2015)

typeof(results_2015$Choice_Party)
summary(results_2015$Choice_Party)
choice_party_char <- as.character(results_2015_filt$Choice_Party)
head(choice_party_char)

##this is removing some of the empties, but not all of them
x <- choice_party_char[choice_party_char != ""]
y <- choice_party_char[choice_party_char != " "]
choice_party <- c(x,y)

summary(choice_party)

results_2015_dems <- results_2015 %>%
  select(Choice_Party, Contest_Group_ID) %>%
  filter(as.character(Choice_Party) == "DEM")

results_2015_repubs <- results_2015 %>%
  select(Choice_Party, Contest_Group_ID) %>%
  filter(as.character(Choice_Party) == "REP")

results_2015_dem_repub <- c(results_2015_repubs, results_2015_dems)

head(results_2015_dem_repub)

all_IDs <- c(results_2015_dems$Contest_Group_ID, results_2015_repubs$Contest_Group_ID)